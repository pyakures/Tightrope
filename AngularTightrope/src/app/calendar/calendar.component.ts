/*Custom Code Section By Michael Dorado and Sahil Pyakurel*/
/*Module imports*/
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
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
import {Router} from '@angular/router';
import { templateJitUrl } from '@angular/compiler';

/*Defining a calendar component*/
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
/*Calendar Object Class Declaration*/
export class CalendarComponent{
  //AuthService is for the logout, AuthReRoute is to route the page after logout is pressed
  constructor(private authService: AuthService, private AuthReRoute: Router){}

  /*Outsourced code from https://github.com/mattlewis92/angular-calendar#getting-started*/
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  /*End of outsourced code*/


  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = []


  /*Custom Code By Sahil*/
  //function that opens the day view of the calendar while clicked on the date
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    //window.alert(events.entries);
    //this.openAppointmentList(date)
    this.viewDate= date;
    this.setView(CalendarView.Day);

  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    //WHAT HAPPENS WHEN AN EVENT IS CLICKED
  }

  /*Custom Code By Sahil*/
  //function that takes the input form the from, parses the information like name and data, uses those vraiables to create a new event
  addEvent(newtitle:string, startdate:string, enddate:string): void {
    
    //startdate = startdate + ":00Z";
    //enddate = enddate + ":00Z";
    
    var hourstringstart:String="";
    var minutestringstart:String="";
    var hourstringend:String="";
    var minutestringend:String="";

    for(let i=0; i< startdate.length; i++){

        if(startdate[i]=='T'){
          //start 
          hourstringstart+= startdate[i+1];
          hourstringstart+= startdate[i+2];
        }
        else if(startdate[i]==':')
        {
          minutestringstart+= startdate[i+1];
          minutestringstart+= startdate[i+2];
        }
    }

    for(let i=0; i< enddate.length; i++){

      if(enddate[i]=='T'){
        //start 
        hourstringend+= enddate[i+1];
        hourstringend+= enddate[i+2];
      }
      else if(enddate[i]==':')
      {
        minutestringend+= enddate[i+1];
        minutestringend+= enddate[i+2];
      }
  }

    var timehourstart:number = Number(hourstringstart);
    var timeminutesstart = Number(minutestringstart);

    var timehourend:number = Number(hourstringend);
    var timeminutesend = Number(minutestringend);

    this.events = [
      ...this.events,
      {
        
        title: newtitle,
        start: setHours(setMinutes(new Date(Date.parse(startdate)), timeminutesstart), timehourstart),
        end: setHours(setMinutes(new Date(Date.parse(enddate)), timeminutesend), timehourend),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ]
  
  }

  //passes the form input values upon submitting it
  onClickSubmit(data:any){
    this.addEvent(data.Event, data.StartDate, data.EndDate);
  }

  //Call /service/AuthService logout function
  logout() {
    this.authService.logout();
    //Reroute to the login page
    this.AuthReRoute.navigate(['/login'])
  }
  
/*End of custom code section*/
} 