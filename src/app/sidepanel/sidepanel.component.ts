//Custom Code by Sahil Pyakurel
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDayViewComponent } from 'angular-calendar';
import { setHours, startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, setMinutes, setDate } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Time } from '@angular/common';
import { DayCalendarComponent } from 'ng2-date-picker';
import { AuthService } from '../service/auth.service';
import {Router, RouterLink} from '@angular/router';
import { templateJitUrl } from '@angular/compiler';
import {SharedService} from 'src/app/shared.service';
import { waitForAsync } from '@angular/core/testing';
//import { Console } from 'console';




@Component({
  selector: 'app-sidepanel',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './sidepanel.component.html',       
  styleUrls: ['./sidepanel.component.css'], 
  
 
})
export class SidepanelComponent implements OnInit {


  @ViewChild('StreaksPopUP') streakpop!: TemplateRef<any>;
 


  //AuthService is for the logout, AuthReRoute is to route the page after logout is pressed
  constructor(private authService: AuthService, private AuthReRoute: Router, private service:SharedService, private modalService: NgbModal, fb: FormBuilder){
    this.form = fb.group({
      selectedActivities:  new FormArray([])
     });
  
  }


  userVar:any;
  stresslevel:any;
  stressfullDay:any;
  stressfullCount: any; 
  totalStress: any;
  totalStressTime : any;
  totalLeisure: any;

  firstName:any;
  lastName:any;
  fullName:any;
  monthALLCAPS:any;

  

  //constructor() { }

   config = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    
  };

  
  ngOnInit(): void {
    this.displayStressLevel();
    this.displayStressfullDay();
    this.displayStressfullCount();
    //Displays in hours with 2 places for decimal
    this.displayTotalStress();
    //Returns array with both completed and scheduled (completed first)
    this.displayMindfulnessCompleted();
    //Calendar display methods 
    this.displayCurrentUser();
    this.displayCurrentMonth();
    this.getStreaksdata();

  }
  

  //Call /service/AuthService logout function
  logout() {
    this.authService.logout();
    localStorage.clear();
    //Reroute to the login page
    this.AuthReRoute.navigate(['/login'])
  }

  displayCurrentMonth():void{
    //a method to return the current month to the side panel by Sahil Pyakurel
    var monthstring = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    var month = d.getMonth();
    var year = d.getUTCFullYear();
    var monthname = monthstring[month] + " " + year;
    this.monthALLCAPS= monthname.toUpperCase();
    
  }

  displayCurrentUser():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getProfile(currentUser.token).subscribe(data=>{this.userVar=data;
      this.firstName = this.userVar.userFirstName;
      this.lastName = this.userVar.userLastName;
      this.fullName= this.firstName + " " + this.lastName;
      });

  }

  displayStressLevel():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getStressPredict(currentUser.email).subscribe(data=>{this.stresslevel=data; 
           // console.log(this.stresslevel)
              
          
            }); 

    

  }

  displayStressfullDay():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getStressfullDay(currentUser.email).subscribe(data=>{this.stressfullDay=data; 
    //console.log(this.stressfullDay)
      
  
    }); 
  }

  displayStressfullCount():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getStressEvents(currentUser.email).subscribe(data=>{this.stressfullCount=data; 
    //console.log(this.stressfullCount)
      
  
    }); 

    //console.log(this.stressfullCount)
  }

  displayTotalStress():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getTotalStress(currentUser.email).subscribe(data=>{this.totalStress=data; 
    //console.log(this.totalStress)
      
  
    this.totalStress = Number(this.totalStress/60).toFixed(2);
    //console.log("Stress Time:");
   // console.log(this.totalStress);
    }); 

    

  }

  displayMindfulnessCompleted():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getMindfulnessCount(currentUser.email).subscribe(data=>{this.totalLeisure=data; 
    //console.log(this.totalLeisure)
      
  
    }); 
  }



  /////stress popup algos

  form: FormGroup;
  streaksevents:any;
  userdata:any;
  streaksactivities:any;
  streakcount:any = 0;

  getStreaksdata(){
  
  
    this.streaksevents = JSON.parse(localStorage.getItem('streaksData') as string);
    //console.log(this.streaksevents[0][0].UserEmail);
    console.log(this.streaksevents);
    this.userdata = this.streaksevents[0][0];
    this.streaksactivities= this.streaksevents[1];
    console.log(this.streaksactivities);
    this.streakcount= this.streaksevents[0][0].StreakCount;
    console.log(this.streakcount);

    if(this.streaksactivities[0]!=undefined){
      this.open(this.streakpop);
    }
    

  }

  

  //Modal

  closeResult = '';
  
  open(content: TemplateRef<any>) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.skipCheck();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.skipCheck();
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //If the box is status is changed then the activity is added/removed from selected activities
  completedLength:any;

  onCheckboxChange(event: any) {
    const selectedActivities = (this.form.controls.selectedActivities as FormArray);
    if (event.target.checked) {
      selectedActivities.push(new FormControl(event.target.value));
    } else {
      const index = selectedActivities.controls.findIndex(x => x.value === event.target.value);
      selectedActivities.removeAt(index);
    }
    //console.log(selectedActivities.value);
    //console.log(selectedActivities.length);
    this.completedLength= selectedActivities.length;
    //console.log(this.streaksactivities.length);
    
  }

  skipCheck(){
    this.userdata.StreakCount= 0;
    console.log(this.userdata);
    this.service.updateStreaks(this.userdata).subscribe(response =>{console.log('server response: ', response);
    this.getStreaksdata();
    this.modalService.dismissAll('Skip');
    alert("Streaks has been reset to 0. When prompted, please select all of the mindfulness activites and click on 'Complete Activities' to add it to your streaks.");
    });
    
  }


  submit(){
    if(this.completedLength==this.streaksactivities.length){
      this.userdata.StreakCount= this.userdata.StreakCount+this.completedLength;

      console.log(this.userdata);
      this.service.updateStreaks(this.userdata).subscribe(response =>{console.log('server response: ', response);
    
      this.getStreaksdata();
      this.modalService.dismissAll('Submit');
      alert("Streaks has been updated.");
      });
    }
    else{
      this.skipCheck();
    }
  
    
  }

}

