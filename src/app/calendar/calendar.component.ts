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
    //Nov 21 Sunday
    {
      title: 'Dungeons and Dragons (Lesiure)',
      start: setHours(setMinutes(new Date(Date.parse("November 21 2021")), 0), 12),
      end: setHours(setMinutes(new Date(Date.parse("November 21 2021")), 0), 16), 
      color: {primary: '#7fba01', secondary: '#cfe995'}
    },
    {
      title: 'CS 446 Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 21 2021")), 30), 17),
      end: setHours(setMinutes(new Date(Date.parse("November 21 2021")), 0), 22), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    //Nov 22 Monday
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("November 22 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("November 22 2021")), 30), 12), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 22 2021")), 0), 13),
      end: setHours(setMinutes(new Date(Date.parse("November 22 2021")), 15), 14), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CPE 400 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 22 2021 02:00:00")), 30), 14),
      end: setHours(setMinutes(new Date(Date.parse("November 22 2021 02:00:00")), 45), 15), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'STATS 461 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 22 2021 02:00:00")), 0), 16),
      end: setHours(setMinutes(new Date(Date.parse("November 22 2021 02:00:00")), 15), 17), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 22 2021 02:00:00")), 0), 19),
      end: setHours(setMinutes(new Date(Date.parse("November 22 2021 02:00:00")), 0), 23), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Nov 23, Tuesday
    {
      title: 'CS 425 Group Project',
      start: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 15), 10), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 425 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 30), 10),
      end: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 45), 11), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 30), 12),
      end: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 30), 14), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'MATH 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 0), 15),
      end: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 15), 16), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Math 446 Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 0), 17),
      end: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 30), 19), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Stretching (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 0), 20),
      end: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 30), 20), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },
    {
      title: 'Video Games (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 0), 21),
      end: setHours(setMinutes(new Date(Date.parse("November 23 2021")), 30), 22), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },

    //Nov 24 Wednesday
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("November 24 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("November 24 2021")), 30), 12), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 24 2021")), 0), 13),
      end: setHours(setMinutes(new Date(Date.parse("November 24 2021")), 15), 14), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CPE 400 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 24 2021 02:00:00")), 30), 14),
      end: setHours(setMinutes(new Date(Date.parse("November 24 2021 02:00:00")), 45), 15), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'STATS 461 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 24 2021 02:00:00")), 0), 16),
      end: setHours(setMinutes(new Date(Date.parse("November 24 2021 02:00:00")), 15), 17), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 24 2021 02:00:00")), 0), 19),
      end: setHours(setMinutes(new Date(Date.parse("November 24 2021 02:00:00")), 0), 23), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Nov 25 Thursday
    {
      title: 'CS 425 Group Project',
      start: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 15), 10), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 425 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 30), 10),
      end: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 45), 11), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'MATH 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 0), 15),
      end: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 15), 16), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Math 446 Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 0), 17),
      end: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 30), 19), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Stretching (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 0), 20),
      end: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 30), 20), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 0), 21),
      end: setHours(setMinutes(new Date(Date.parse("November 25 2021")), 30), 23), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Nov 26 Friday
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("November 26 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("November 26 2021")), 45), 16), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Team Meeting IC',
      start: setHours(setMinutes(new Date(Date.parse("November 26 2021")), 0), 17),
      end: setHours(setMinutes(new Date(Date.parse("November 26 2021")), 0), 18), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 26 2021")), 30), 18),
      end: setHours(setMinutes(new Date(Date.parse("November 26 2021")), 0), 22), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Nov 27 Saturday    
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 27 2021")), 0), 10),
      end: setHours(setMinutes(new Date(Date.parse("November 27 2021")), 0), 18), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Stretching Leisure',
      start: setHours(setMinutes(new Date(Date.parse("November 27 2021")), 30), 18),
      end: setHours(setMinutes(new Date(Date.parse("November 27 2021")), 0), 19), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },

    {
      title: 'Video Games (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("November 27 2021")), 15), 19),
      end: setHours(setMinutes(new Date(Date.parse("November 27 2021")), 30), 21), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },

    //_______________________Week of 11/28_________________________________________//
    //Nov 28 Sunday
    {
      title: 'Dungeons and Dragons (Lesiure)',
      start: setHours(setMinutes(new Date(Date.parse("November 28 2021")), 0), 12),
      end: setHours(setMinutes(new Date(Date.parse("November 28 2021")), 0), 16), 
      color: {primary: '#7fba01', secondary: '#cfe995'}
    },
    {
      title: 'CS 446 Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 28 2021")), 30), 16),
      end: setHours(setMinutes(new Date(Date.parse("November 28 2021")), 0), 22), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    //Nov 29 Monday
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("November 29 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("November 29 2021")), 30), 12), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 29 2021")), 0), 13),
      end: setHours(setMinutes(new Date(Date.parse("November 29 2021")), 15), 14), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CPE 400 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 29 2021 02:00:00")), 30), 14),
      end: setHours(setMinutes(new Date(Date.parse("November 29 2021 02:00:00")), 45), 15), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'STATS 461 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 29 2021 02:00:00")), 0), 16),
      end: setHours(setMinutes(new Date(Date.parse("November 29 2021 02:00:00")), 15), 17), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 29 2021 02:00:00")), 0), 19),
      end: setHours(setMinutes(new Date(Date.parse("November 29 2021 02:00:00")), 0), 22), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Nov 30, Tuesday
    {
      title: 'CS 425 Group Project',
      start: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 15), 10), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 425 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 30), 10),
      end: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 45), 11), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 30), 12),
      end: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 30), 14), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'MATH 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 0), 15),
      end: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 15), 16), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Math 446 Studying',
      start: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 0), 17),
      end: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 30), 19), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Stretching (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 0), 20),
      end: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 30), 20), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },
    {
      title: 'Video Games (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 0), 21),
      end: setHours(setMinutes(new Date(Date.parse("November 30 2021")), 30), 22), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },

    //Dec 1 Wednesday
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("December 1 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("December 1 2021")), 30), 12), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 1 2021")), 0), 13),
      end: setHours(setMinutes(new Date(Date.parse("December 1 2021")), 15), 14), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CPE 400 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 1 2021 02:00:00")), 30), 14),
      end: setHours(setMinutes(new Date(Date.parse("December 1 2021 02:00:00")), 45), 15), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'STATS 461 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 1 2021 02:00:00")), 0), 16),
      end: setHours(setMinutes(new Date(Date.parse("December 1 2021 02:00:00")), 15), 17), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 1 2021 02:00:00")), 0), 19),
      end: setHours(setMinutes(new Date(Date.parse("December 1 2021 02:00:00")), 0), 23), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Dec 2 Thursday
    {
      title: 'CS 425 Group Project',
      start: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 15), 10), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 425 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 30), 10),
      end: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 45), 11), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 30), 12),
      end: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 30), 14), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'MATH 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 0), 15),
      end: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 15), 16), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Math 446 Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 0), 17),
      end: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 30), 19), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Stretching (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 0), 20),
      end: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 30), 20), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 0), 21),
      end: setHours(setMinutes(new Date(Date.parse("December 2 2021")), 30), 23), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Dec 3 Friday
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("December 3 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("December 3 2021")), 30), 13), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 3 2021")), 0), 14),
      end: setHours(setMinutes(new Date(Date.parse("December 3 2021")), 45), 16), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Team Meeting IC',
      start: setHours(setMinutes(new Date(Date.parse("December 3 2021")), 0), 17),
      end: setHours(setMinutes(new Date(Date.parse("December 3 2021")), 0), 18), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 3 2021")), 30), 18),
      end: setHours(setMinutes(new Date(Date.parse("December 3 2021")), 0), 22), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Dec 4 Saturday   
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("December 4 2021")), 0), 12),
      end: setHours(setMinutes(new Date(Date.parse("December 4 2021")), 0), 17), 
      color: {primary: '#7fba02', secondary: 'white'}
    }, 
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 4 2021")), 0), 18),
      end: setHours(setMinutes(new Date(Date.parse("December 4 2021")), 0), 20), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Stretching (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("December 4 2021")), 1), 20),
      end: setHours(setMinutes(new Date(Date.parse("December 4 2021")), 30), 20), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },

    {
      title: 'Video Games (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("December 4 2021")), 31), 20),
      end: setHours(setMinutes(new Date(Date.parse("December 4 2021")), 30), 21), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },

    //_______________________Week of 12/5_________________________________________//
    //Dec 5 Sunday
    {
      title: 'Dungeons and Dragons (Lesiure)',
      start: setHours(setMinutes(new Date(Date.parse("December 5 2021")), 0), 12),
      end: setHours(setMinutes(new Date(Date.parse("December 5 2021")), 0), 16), 
      color: {primary: '#7fba01', secondary: '#cfe995'}
    },
    {
      title: 'CS 446 Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 5 2021")), 30), 17),
      end: setHours(setMinutes(new Date(Date.parse("December 5 2021")), 0), 22), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    //Dec 6 Monday
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("December 6 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("December 6 2021")), 30), 12), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 6 2021")), 0), 13),
      end: setHours(setMinutes(new Date(Date.parse("December 6 2021")), 15), 14), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CPE 400 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 6 2021 02:00:00")), 30), 14),
      end: setHours(setMinutes(new Date(Date.parse("December 6 2021 02:00:00")), 45), 15), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'STATS 461 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 6 2021 02:00:00")), 0), 16),
      end: setHours(setMinutes(new Date(Date.parse("December 6 2021 02:00:00")), 15), 17), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 6 2021 02:00:00")), 0), 19),
      end: setHours(setMinutes(new Date(Date.parse("December 6 2021 02:00:00")), 0), 23), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Dec 7 Tuesday
    {
      title: 'CS 425 Group Project',
      start: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 15), 10), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 425 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 30), 10),
      end: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 45), 11), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 30), 12),
      end: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 30), 14), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'MATH 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 0), 15),
      end: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 15), 16), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Math 446 Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 0), 17),
      end: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 30), 19), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Stretching (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 0), 20),
      end: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 30), 20), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },
    {
      title: 'Video Games (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 0), 21),
      end: setHours(setMinutes(new Date(Date.parse("December 7 2021")), 30), 22), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },

    //Dec 8 Wednesday
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("December 8 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("December 8 2021")), 30), 12), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 8 2021")), 0), 13),
      end: setHours(setMinutes(new Date(Date.parse("December 8 2021")), 15), 14), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CPE 400 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 8 2021 02:00:00")), 30), 14),
      end: setHours(setMinutes(new Date(Date.parse("December 8 2021 02:00:00")), 45), 15), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'STATS 461 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 8 2021 02:00:00")), 0), 16),
      end: setHours(setMinutes(new Date(Date.parse("December 8 2021 02:00:00")), 15), 17), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Stretching (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("December 8 2021")), 30), 17),
      end: setHours(setMinutes(new Date(Date.parse("December 8 2021")), 0), 18), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 8 2021 02:00:00")), 0), 19),
      end: setHours(setMinutes(new Date(Date.parse("December 8 2021 02:00:00")), 0), 23), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Dec 9 Thursday
    {
      title: 'CS 425 Group Project',
      start: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 15), 10), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'CS 425 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 30), 10),
      end: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 45), 11), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    {
      title: 'Stretching (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 0), 12),
      end: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 30), 12), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },

    {
      title: 'MATH 446 Lecture',
      start: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 0), 15),
      end: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 15), 16), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Math 446 Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 0), 17),
      end: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 30), 19), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 30), 19),
      end: setHours(setMinutes(new Date(Date.parse("December 9 2021")), 30), 23), 
      color: {primary: '#7fba02', secondary: 'white'}
    },

    //Dec 10 Friday
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("December 10 2021")), 0), 8),
      end: setHours(setMinutes(new Date(Date.parse("December 10 2021")), 30), 13), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 10 2021")), 0), 14),
      end: setHours(setMinutes(new Date(Date.parse("December 10 2021")), 45), 16), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Team Meeting IC',
      start: setHours(setMinutes(new Date(Date.parse("December 10 2021")), 0), 17),
      end: setHours(setMinutes(new Date(Date.parse("December 10 2021")), 0), 18), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 10 2021")), 30), 18),
      end: setHours(setMinutes(new Date(Date.parse("December 10 2021")), 0), 22), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    //Dec 11 Saturday    
    {
      title: 'Stretching (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("December 11 2021")), 0), 10),
      end: setHours(setMinutes(new Date(Date.parse("December 11 2021")), 30), 10), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },
    {
      title: 'Work at IC',
      start: setHours(setMinutes(new Date(Date.parse("December 11 2021")), 0), 12),
      end: setHours(setMinutes(new Date(Date.parse("December 11 2021")), 0), 17), 
      color: {primary: '#7fba02', secondary: 'white'}
    }, 
    {
      title: 'Studying',
      start: setHours(setMinutes(new Date(Date.parse("December 11 2021")), 0), 18),
      end: setHours(setMinutes(new Date(Date.parse("December 11 2021")), 0), 20), 
      color: {primary: '#7fba02', secondary: 'white'}
    },
    {
      title: 'Video Games (Leisure)',
      start: setHours(setMinutes(new Date(Date.parse("December 11 2021")), 1), 20),
      end: setHours(setMinutes(new Date(Date.parse("December 11 2021")), 30), 21), 
      color: {primary: '#7fba02', secondary: '#cfe995'}
    },

  ]


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    //window.alert(events.entries);
    //this.openAppointmentList(date)
    this.viewDate= date;
    this.setView(CalendarView.Day);

  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    window.alert("Title: "+event.title +"\nStart Time: "+event.start +"\nEnd Time: "+event.end);
  }

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

  onClickSubmit(data:any){
    this.addEvent(data.Event, data.StartDate, data.EndDate);
  }

  



  
} 