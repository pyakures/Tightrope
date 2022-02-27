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
  selector: 'app-account',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userVar:any;
  firstName_u:any;
  lastName_u:any;
  userName_u:any;
  password_u:any;

  firstName:any;
  lastName:any;
  fullName:any;
  Useremail:any;

  constructor(private authService: AuthService, private AuthReRoute: Router, private service:SharedService) { }

  ngOnInit(): void {
    this.getAccountInfo();
  }
  onSubmit(){   
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(this.firstName_u!= undefined){
      let changeVal = {first_name: this.firstName_u};
      this.service.editProfile(currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);});
    }
    if(this.lastName_u!= undefined){
      let changeVal = {last_name: this.lastName_u};
      this.service.editProfile(currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);});
    }
    if(this.userName_u!=undefined){
      let changeVal = {email: this.userName_u};
      this.service.editProfile(currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);});
    }
    if(this.password_u!=undefined){
      let changeVal = {password: this.password_u};
      this.service.editProfile(currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);});
    }
    this.AuthReRoute.navigate(['/home']);
  }
  getAccountInfo(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getProfile(currentUser.token).subscribe(data=>{this.userVar=data;
    this.firstName = this.userVar.userFirstName;
    this.lastName = this.userVar.userLastName;
    this.fullName= this.firstName + " " + this.lastName;
    this.Useremail= this.userVar.user;
    });
    
  }
  deactivate(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.deleteProfile(currentUser.token).subscribe(response =>{console.log('server response: ', response);});
    alert("Account Deactivated!");
    this.authService.logout();
    this.AuthReRoute.navigate(['/login'])
  }
}
