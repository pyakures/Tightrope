import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDayViewComponent } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Time } from '@angular/common';
import { DayCalendarComponent } from 'ng2-date-picker';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent{
  constructor(
   
  ){}


  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;


  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date(/*"2021-11-14T03:24:00"*/)),
      //end: endOfDay(new Date("2021-11-14T04:24:00")),
      title: 'An event with no end date',
    }
  ]
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    //window.alert(events.entries);
    //this.openAppointmentList(date)
    this.viewDate= date;
    this.setView(CalendarView.Day);

  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    window.alert("Title: "+event.title +"\nTime: "+event.start);
  }

  addEvent(newtitle:string, startdate:string, enddate:string): void {
    
    startdate = startdate + ":00Z";
    enddate = enddate + ":00Z";
    window.alert(startdate);
    this.events = [
      ...this.events,
      {
        
        title: newtitle,
        start: startOfDay(new Date(startdate)),
        end: endOfDay(new Date(enddate)),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ]
  
  }

  onClickSubmit(data:any){
    this.addEvent(data.Event, data.StartDate, data.EndDate);
  }

  



  
} 