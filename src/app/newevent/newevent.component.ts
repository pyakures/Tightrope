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

//created object model in another file and imported into component
import { NEW_EVENT } from './newevent.model';


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

  constructor(private authService: AuthService, private AuthReRoute: Router, private service:SharedService) { }
  
  ngOnInit(): void {
    this.getEventInfo();

  }
  getEventInfo():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getEvents(currentUser.email).subscribe(data=>{this.EventsList=data; 
    
    
      for(var i=0; i< this.EventsList.length; i++){
        if(this.EventsList[i].EventID == this.service.sharedid){
          this.Eventname = this.EventsList[i].EventName;
          var date = new Date(this.EventsList[i].StartDate);
          this.StartDate = date.toUTCString();
          date = new Date(this.EventsList[i].EndDate);
          this.EndDate = date.toUTCString();
          this.Notes = this.EventsList[i].Notes;
          this.Location = this.EventsList[i].Location;
          this.levelofstress = this.EventsList[i].StressLevel;
          this.typeofevent = this.EventsList[i].EventType;
        }
      }
    
    }); 

    

  }
  
  onSubmit(){
    var startTest = this.StartDate;
    console.log('test start date ', startTest);
    var newevent = new NEW_EVENT(this.Eventname, this.StartDate, this.EndDate, this.Location, this.levelofstress, this.typeofevent, this.Notes);
    console.log('new event name: ', newevent.EventName);
    console.log('new event location: ', newevent.Location);
    console.log('new event notes: ', newevent.Notes);
    console.log('new event stress: ', newevent.StressLevel);
    console.log('new event type: ', newevent.EventType);

    this.service.addEvent(newevent).subscribe(res=>{
      alert(res.toString());});

    this.getEventInfo();


    
  }


}
