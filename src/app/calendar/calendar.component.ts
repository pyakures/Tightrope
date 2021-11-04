import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  title = "Calender of User";
  calendar;

  constructor(service: CalendarService){
    this.calendar = service.getCalendar();
  }

  ngOnInit(): void {
  }

}