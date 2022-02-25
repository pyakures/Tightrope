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

  stresslevel:any=[];

  //constructor() { }
  //a method to return the current month to the side panel by Sahil Pyakurel
  monthstring = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  d = new Date();
  month = this.d.getMonth();
  year = this.d.getUTCFullYear();
  monthname = this.monthstring[this.month] + " " + this.year;
  monthALLCAPS= this.monthname.toUpperCase();

  
 
  config = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    
  };

  currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  firstName = this.currentUser.userFirstName;
  lastName = this.currentUser.userLastName;
  fullName= this.firstName + " " + this.lastName;


  
  ngOnInit(): void {

    this.displayStressLevel();
    }
  

    //Call /service/AuthService logout function
    logout() {
      this.authService.logout();
      //Reroute to the login page
      this.AuthReRoute.navigate(['/login'])
    }

    displayStressLevel():void{
      var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      this.service.getStressPredict(currentUser.email).subscribe(data=>{this.stresslevel=data; 
      console.log(this.stresslevel)
        
    
    }); 
    }

}

