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


  //variables w _u are the local updated variables used in the html and ts 
  Eventname_u:any;
  Notes_u:any;
  Location_u:any;
  StartDate_u:any;
  EndDate_u:any;
  levelofstress_u:any;
  typeofevent_u:any;





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



              console.log(this.EventsList);
        }
      }
    
    });
    
    this.AuthReRoute.navigate(['/home']);
    
    
    
  }

  updateValue(){

    //Takes user input from html form and passes into local updated variables
    var Eventname_u = this.Eventname_u;
    console.log('new event name:', Eventname_u); 
    var Notes_u = this.Notes_u;
    console.log('new event notes:', Notes_u); 
    var Location_u = this.Location_u;
    console.log('new location:', Location_u); 
    var StartDate_u = this.StartDate_u;
    console.log('new start:', StartDate_u);
    var EndDate_u = this.StartDate_u;
    console.log('new end: ', EndDate_u);
    var levelofstress_u = this.levelofstress_u;
    console.log('new stress: ', levelofstress_u);
    var typeofevent_u = this.typeofevent_u;
    console.log('new type: ', typeofevent_u);

    //Goes through eventslist until matching EventID is founc
    for(var i=0; i< this.EventsList.length; i++){
      //Compares EventID with sharedid
      if(this.EventsList[i].EventID == this.service.sharedid){
        //Conditions check if there was a change to the event information
        //If there was a change, the corresponding attribute of the Event in list is updated
        if(Eventname_u != undefined){
          this.EventsList[i].EventName = Eventname_u;
        }
        if(StartDate_u != undefined){
          this.EventsList[i].StartDate = StartDate_u;
        }
        if(EndDate_u != undefined){
          this.EventsList[i].EndDate = EndDate_u;
        }
        if(Location_u != undefined){
          this.EventsList[i].Location = Location_u;
        }
        if(levelofstress_u != undefined){
          this.EventsList[i].StressLevel = levelofstress_u;
        }
        if(typeofevent_u != undefined){
          this.EventsList[i].EventType = typeofevent_u;
        }
        if(Notes_u != undefined){
          this.EventsList[i].Notes = Notes_u;
        }

        //Updated Event is pushed to the database 
        //alert indicating successful update displayed to user
        this.service.updateEvent(this.EventsList[i]).subscribe(res=>{
          alert(res.toString());});

           
      }
    
    
    }

    //Returns user to calendar after submitting changes
    this.AuthReRoute.navigate(['/home']);
    //refreshes calendar to reflect updated event
    this.getEventInfo();
    //debugging command
    console.log(this.EventsList[i]); 
      
  }
}

