/*Custom Code Section By Michael Dorado and Sahil Pyakurel*/
/*Module imports*/
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDayViewComponent } from 'angular-calendar';
import { setHours, startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, setMinutes, setDate } from 'date-fns';
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
import { reduceEachLeadingCommentRange } from 'typescript';
import { colors } from './colors';

/*Defining a calendar component*/
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
/*Calendar Object Class Declaration*/
export class CalendarComponent implements OnInit {
  
  events: CalendarEvent[] = [];
  EventsList:any=[];
  MindfulEvent: any=[];
  //AuthService is for the logout, AuthReRoute is to route the page after logout is pressed
  //SharedService is for accessing the methods in that file - must be .service to denote appropriate method
  constructor(private authService: AuthService, private AuthReRoute: Router, private service:SharedService){
  }

  /*Outsourced code from https://github.com/mattlewis92/angular-calendar#getting-started*/
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  /*End of outsourced code*/

 //Test EventsList
  eventsTest = [
    {eventID: 1, eventName: "test"}
  ]

  //Blank event to add generated mindful event to calendar
  new_Mindful = {
    EventName: "",
    EndDate: "",
    EventType: "",
    Location: "",
    Notes: "",
    StartDate: "",
    StressLevel: "",
    UserEmail: ""
  }
  

  setView(view: CalendarView) {
    this.view = view;

  }

  ngOnInit():void{
    //On page start up, call all events of the user and put them in the "EventsList" variable
    this.refreshEventList();
    if(window.innerWidth < 800){
      this.setView(CalendarView.Day);
    } 
    this.refreshPagewithEvents();

    
    
    



  }
  //Method will pull of Events pertaining to a user from the user table
  refreshEventList():void{
    //Grab the current user out of local storage, parse the package into strings and assign it to the currentUser var
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    //use the "service" module to access the event api, using the currentUser object and the email aspect of that object, then put the data into the events list
    //The subscribe function is a little out of my current knowledge, but know this, it works
    //this.service.getEvents(currentUser.email).subscribe(data=>{this.EventsList=data});
    //Replace the line above this one with the one below this one to see the contents of the EventsList in the browsers inspect console 
    this.service.getEvents(currentUser.email).subscribe(data=>{this.EventsList=data;console.log(this.EventsList)
    
    }); 

    

  
  }



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
    this.service.sharedid = event.id; 
    this.AuthReRoute.navigate(['../editevent']);
  }

  /*Custom Code By Sahil
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
        id: 1,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ]
  
  }*/
  
  //saves events from the API to local event calendar
  refreshPagewithEvents():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getEvents(currentUser.email).subscribe(data=>{
      this.EventsList=data;
      for(var i=0; i<this.EventsList.length; i++){

        var hourstringstart:String="";
        var minutestringstart:String="";
        var hourstringend:String="";
        var minutestringend:String="";
    
    
        for(let j=0; j< this.EventsList[i].StartDate.length; j++){
    
            if(this.EventsList[i].StartDate[j]=='T'){
              //start 
              hourstringstart+= this.EventsList[i].StartDate[j+1];
              hourstringstart+= this.EventsList[i].StartDate[j+2];
            }
            else if(this.EventsList[i].StartDate[j]==':')
            {
              minutestringstart+= this.EventsList[i].StartDate[j+1];
              minutestringstart+= this.EventsList[i].StartDate[j+2];
            }
        }
    
        for(let j=0; j< this.EventsList[i].EndDate.length; j++){
    
          if(this.EventsList[i].EndDate[j]=='T'){
            //start 
            hourstringend+= this.EventsList[i].EndDate[j+1];
            hourstringend+= this.EventsList[i].EndDate[j+2];
          }
          else if(this.EventsList[i].EndDate[j]==':')
          {
            minutestringend+= this.EventsList[i].EndDate[j+1];
            minutestringend+= this.EventsList[i].EndDate[j+2];
          }
      }
    
        var timehourstart:number = Number(hourstringstart);
        var timeminutesstart = Number(minutestringstart);
    
        var timehourend:number = Number(hourstringend);
        var timeminutesend = Number(minutestringend);

        var EventColor= colors.green;
    

        if(this.EventsList[i].EventType=="2"){
          var EventColor = colors.lightBlue;
        }
        else if(this.EventsList[i].EventType=="0"){
          var EventColor= colors.orange;
        }
        
    
        this.events = [
          ...this.events,
          {
            id: this.EventsList[i].EventID,
            title: this.EventsList[i].EventName,
            color: EventColor,
            start: setHours(new Date(Date.parse(this.EventsList[i].StartDate)), timehourstart),
            end: setHours(new Date(Date.parse(this.EventsList[i].EndDate)), timehourend),
            draggable: false,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
          },
        ]
      }
    });
 
    

    


  }

  generateMindfulEvent(){
    console.log("generate mindful event selected:");
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    //Pulls mindful info from user preferences for mindful activities
    this.service.getMindfulEvents(currentUser.email).subscribe(data=>{this.MindfulEvent=data; console.log(this.MindfulEvent);
    //Parses event data from selected event to the new event so userEmail can be added to the object 
    //Needs to add information to Mindful event 'Location' attribute 
    //this.new_Mindful = {EventName: this.MindfulEvent.EventName, EventType: this.MindfulEvent.EventType, EndDate: this.MindfulEvent.EndDate, StartDate: this.MindfulEvent.StartDate,
    //    Location: "Anywhere", Notes: this.MindfulEvent.Notes, StressLevel: this.MindfulEvent.StressLevel, UserEmail: this.MindfulEvent.UserEnail}  
    this.MindfulEvent.Location = "anywhere";
    console.log("mindful event (done)", this.MindfulEvent);
    //console.log("This new mindful" ,this.new_Mindful);
    //Adds new local event to user's calendar 
    this.service.addEvent(this.MindfulEvent).subscribe(res=>{
          alert(res.toString());});
      });
    
  }

  /*
  //passes the form input values upon submitting it
  onClickSubmit(data:any){
    this.addEvent(data.Event, data.StartDate, data.EndDate);
  }*/

  //Call /service/AuthService logout function
  logout() {
    this.authService.logout();
    //Reroute to the login page
    this.AuthReRoute.navigate(['/login'])
  }
  
  public getScreenWidth: any;


/*End of custom code section*/


} 