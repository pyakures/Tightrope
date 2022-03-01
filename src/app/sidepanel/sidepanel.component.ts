//Custom Code by Sahil Pyakurel
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDayViewComponent } from 'angular-calendar';
import { setHours, startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, setMinutes, setDate } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Time } from '@angular/common';
import { DayCalendarComponent } from 'ng2-date-picker';
import { AuthService } from '../service/auth.service';
import {Router, RouterLink} from '@angular/router';
import { templateJitUrl } from '@angular/compiler';
import {SharedService} from 'src/app/shared.service';


@Component({
  selector: 'app-sidepanel',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './sidepanel.component.html',       
  styleUrls: ['./sidepanel.component.css'], 
  
 
})
export class SidepanelComponent implements OnInit {

  //AuthService is for the logout, AuthReRoute is to route the page after logout is pressed
  constructor(private authService: AuthService, private AuthReRoute: Router, private service:SharedService){}
  userVar:any;
  stresslevel:any=[];
  stressfullDay:any;
  stressfullCount: any; 
  totalStress: any;
  totalLeisure: any;

  firstName:any;
  lastName:any;
  fullName:any;
  monthALLCAPS:any;

  //constructor() { }

   config = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    
  };

  
  ngOnInit(): void {
    this.displayStressLevel();
    this.displayStressfullDay();
    this.displayStressfullCount();
    //Displays in minutes atm
    this.displayTotalStress();
    //Returns both completed and scheduled (completed first)
    this.displayMindfulnessCompleted();
    //Calendar display methods 
    this.displayCurrentUser();
    this.displayCurrentMonth();

  }
  

  //Call /service/AuthService logout function
  logout() {
    this.authService.logout();
    //Reroute to the login page
    this.AuthReRoute.navigate(['/login'])
  }

  displayCurrentMonth():void{
    //a method to return the current month to the side panel by Sahil Pyakurel
    var monthstring = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    var month = d.getMonth();
    var year = d.getUTCFullYear();
    var monthname = monthstring[month] + " " + year;
    this.monthALLCAPS= monthname.toUpperCase();
    
  }

  displayCurrentUser():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getProfile(currentUser.token).subscribe(data=>{this.userVar=data;
      this.firstName = this.userVar.userFirstName;
      this.lastName = this.userVar.userLastName;
      this.fullName= this.firstName + " " + this.lastName;
      });

  }

  displayStressLevel():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getStressPredict(currentUser.email).subscribe(data=>{this.stresslevel=data; 
            console.log(this.stresslevel)
              
          
            }); 

  }

  displayStressfullDay():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getStressfullDay(currentUser.email).subscribe(data=>{this.stressfullDay=data; 
    console.log(this.stressfullDay)
      
  
    }); 
  }

  displayStressfullCount():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getStressEvents(currentUser.email).subscribe(data=>{this.stressfullCount=data; 
    console.log(this.stressfullCount)
      
  
    }); 
  }

  displayTotalStress():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getTotalStress(currentUser.email).subscribe(data=>{this.totalStress=data; 
    console.log(this.totalStress)
      
  
    }); 
  }

  displayMindfulnessCompleted():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getMindfulnessCount(currentUser.email).subscribe(data=>{this.totalLeisure=data; 
    console.log(this.totalLeisure)
      
  
    }); 
  }
}

