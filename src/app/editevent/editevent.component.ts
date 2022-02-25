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
  selector: 'app-editevent',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {

  EventsList:any=[];

  constructor(private authService: AuthService, private AuthReRoute: Router, private service:SharedService) { 

  }


  Eventname:any;
  Notes:any;
  Location:any;
  StartDate:any;
  EndDate:any;
  levelofstress:any;
  typeofevent:any;




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

  deleteCurrentEvent(){
    
   
    var tempstring= this.service.sharedid;
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getEvents(currentUser.email).subscribe(data=>{this.EventsList=data; 
    
      for(var i=0; i< this.EventsList.length; i++){
        if(this.EventsList[i].EventID == this.service.sharedid){
          console.log(this.EventsList);
          
          this.service.deleteEvent(this.EventsList[i]).subscribe(res=>{
            alert(res.toString());});

            this.service.updateEvent(this.EventsList[i]).subscribe(res=>{
              alert(res.toString());});

              console.log(this.EventsList);
        }
      }
    
    });
    
    this.AuthReRoute.navigate(['/home']);
    
    
    
  }
 

}
