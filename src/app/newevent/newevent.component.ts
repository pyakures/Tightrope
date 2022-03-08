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

  constructor(private authService: AuthService, private AuthReRoute: Router, private service:SharedService) { }
  
  ngOnInit(): void {

  }
  

  
  onSubmit(){

    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    var newEvent:any;
    newEvent = {'UserEmail' : currentUser.email, 
                'EventName' : this.Eventname, 
                'StartDate' : this.StartDate, 
                'EndDate' : this.EndDate, 
                'Location' : this.Location, 
                'EventType' : this.typeofevent, 
                'StressLevel' : this.levelofstress, 
                'Notes' : this.Notes};

    /*this.service.getEvents(currentUser.email).subscribe(data=>{this.EventsList=data; 
          this.EventsList[0].EventName = this.Eventname;
          this.EventsList[0].StartDate = this.StartDate;
          this.EventsList[0].EndDate = this.EndDate;
          this.EventsList[0].UserEmail = currentUser.email;
          this.EventsList[0].EventType = this.typeofevent;
          this.EventsList[0].Location = this.Location;
          this.EventsList[0].Notes = this.Notes;
          this.EventsList[0].StressLevel = this.levelofstress;

          this.service.addEvent(this.EventsList[0]).subscribe(res=>{
            alert(res.toString());});
        });*/
        console.log(newEvent);
        console.log(currentUser);
        
        this.service.addEvent(newEvent).subscribe(res=>{
            alert(res.toString());});
      this.AuthReRoute.navigate(['/home']);
      

}
}