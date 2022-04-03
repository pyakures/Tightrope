import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDayViewComponent } from 'angular-calendar';
import { setHours, startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, setMinutes } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Time } from '@angular/common';
import { DayCalendarComponent } from 'ng2-date-picker';
import { AuthService } from '../service/auth.service';
import {Router, RouterLink} from '@angular/router';
import { templateJitUrl } from '@angular/compiler';
import {SharedService} from 'src/app/shared.service';
import { saveAs } from 'file-saver';

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

  startdateNostring:any;
  EnddateNostring:any;

  //variables w _u are the local updated variables used in the html and ts 
  Eventname_u:any;
  Notes_u:any;
  Location_u:any;
  StartDate_u:any;
  EndDate_u:any;





  ngOnInit(): void {
    this.getEventInfo();
  }


  getEventInfo():void{
    if(this.service.sharedid==undefined){
      this.AuthReRoute.navigate(['/home']);
    }


    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getEvents(currentUser.email).subscribe(data=>{this.EventsList=data; 
    
    
      for(var i=0; i< this.EventsList.length; i++){
        if(this.EventsList[i].EventID == this.service.sharedid){
          this.Eventname = this.EventsList[i].EventName;
          var date = new Date(this.EventsList[i].StartDate);
          this.startdateNostring= this.EventsList[i].StartDate;
          this.StartDate = date.toUTCString();
          date = new Date(this.EventsList[i].EndDate);
          this.EnddateNostring= this.EventsList[i].EndDate;
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

    this.service.deleteEvent(this.service.sharedid).subscribe(res=>{
      alert(res.toString());
      this.AuthReRoute.navigate(['/home']);
      this.getEventInfo();
    });

    
  }

  updateCurrentEvent(){

    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getEvents(currentUser.email).subscribe(data=>{this.EventsList=data; 
    
    
      for(var i=0; i< this.EventsList.length; i++){
        if(this.EventsList[i].EventID == this.service.sharedid){

            if(this.Eventname_u==undefined){
              this.Eventname_u = this.EventsList[i].EventName;
            }
            
            if(this.StartDate_u==undefined){
              this.StartDate_u = this.EventsList[i].StartDate;
            }
            if(this.EndDate_u==undefined){
              this.EndDate_u = this.EventsList[i].EndDate;
            }
            if(this.Location_u==undefined){
              this.Location_u = this.EventsList[i].Location;
            }
            if(this.levelofstress==undefined){
              this.levelofstress = this.EventsList[i].StressLevel;
            }
            if(this.typeofevent==undefined){
              this.typeofevent = this.EventsList[i].EventType;
            }
            if(this.Notes_u==undefined){
              this.Notes_u = this.EventsList[i].Notes;
            }

          this.EventsList[i].EventName = this.Eventname_u;
          this.EventsList[i].StartDate = this.StartDate_u;
          this.EventsList[i].EndDate = this.EndDate_u;
          this.EventsList[i].Location = this.Location_u;
          this.EventsList[i].StressLevel = this.levelofstress;
          this.EventsList[i].EventType = this.typeofevent;
          this.EventsList[i].Notes = this.Notes_u;

          this.service.updateEvent(this.EventsList[i]).subscribe(res=>{
            alert(res.toString());});
          
            console.log(this.EventsList[i]);    
            
             //Returns user to calendar after submitting changes
              this.AuthReRoute.navigate(['/home']);
              this.getEventInfo();

        }
      }
    
    }); 

   
  }

  shareThisEvent(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    var tempevent = {
      'EventID' : this.service.sharedid
    }

    this.service.getIndividualIcs(currentUser.email, tempevent).subscribe((response: any) => { //when you use stricter type checking
			let blob:any = new Blob([response], { type: 'text/calendar; charset=utf-8' });
      //console.log(blob);
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
      var nameoffile:string = 'Tightrope_event.ics';
      saveAs(blob,nameoffile);
      
    });

  }
}

