import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDayViewComponent } from 'angular-calendar';
import { setHours, startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, setMinutes } from 'date-fns';
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
  selector: 'app-newevent',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css']
})


export class NeweventComponent implements OnInit {
  Eventname:any;
  Notes:any;
  Location:any;
  StartDate:any;
  EndDate:any;
  levelofstress:any;
  typeofevent:any;

  EventsList:any=[];

  constructor(private authService: AuthService, private AuthReRoute: Router, private service:SharedService, private calendarService:CalendarService) { }
  
  ngOnInit(): void {

  }
  

  
  onSubmit(){

    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    var newEvent:any;


    if(this.Eventname == undefined || this.StartDate == undefined || this.EndDate==undefined||this.typeofevent==undefined||this.levelofstress==undefined){

      alert("Please fill out the Event name, Start Date, End Date, Stress Level, and Type to continue.");



    }
    else{

      if(this.Location == undefined){
        this.Location= "Location";
      }

      if(this.Notes == undefined){
        this.Notes= "Notes";
      }


        newEvent = {'UserEmail' : currentUser.email, 
        'EventName' : this.Eventname, 
        'StartDate' : this.StartDate, 
        'EndDate' : this.EndDate, 
        'Location' : this.Location, 
        'EventType' : this.typeofevent, 
        'StressLevel' : this.levelofstress, 
        'Notes' : this.Notes};

      console.log(newEvent);
      console.log(currentUser);

      this.service.addEvent(newEvent).subscribe(res=>{
      alert(res.toString());
      
      if(this.typeofevent==2){
        var streaksevents = JSON.parse(localStorage.getItem('streaksData') as string);
        streaksevents[0][0].LifetimeScheduledMindful = streaksevents[0][0].LifetimeScheduledMindful+1;
        this.service.updateStreaks(streaksevents[0][0]).subscribe(response =>{console.log('server response: ', response);
          localStorage.setItem("streaksData",JSON.stringify(streaksevents));
          this.calendarService.thisDay= new Date(this.StartDate);
          this.AuthReRoute.navigate(['/home']);
        });
      }
      else{
        this.calendarService.thisDay= new Date(this.StartDate);
        this.AuthReRoute.navigate(['/home']);
      }

     
    });
      


    }


}
}