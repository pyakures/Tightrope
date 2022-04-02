import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDayViewComponent } from 'angular-calendar';
import { setHours, startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, setMinutes } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Time } from '@angular/common';
import { DayCalendarComponent } from 'ng2-date-picker';
import { AuthService } from '../service/auth.service';
import {Router, RouterLink} from '@angular/router';
import { templateJitUrl } from '@angular/compiler';
import {SharedService} from 'src/app/shared.service';
import { saveAs } from 'file-saver';


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
  fileName:any;

  constructor(private authService: AuthService, private AuthReRoute: Router, private service:SharedService) { }

  ngOnInit(): void {
    this.getAccountInfo();
  }
  onSubmit(){   
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(this.firstName_u!= undefined){
      let changeVal = {first_name: this.firstName_u};
      this.service.editProfile(currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response); alert(response.toString())});
    }
    if(this.lastName_u!= undefined){
      let changeVal = {last_name: this.lastName_u};
      this.service.editProfile(currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);alert(response.toString())});
    }
    if(this.userName_u!=undefined){
      let changeVal = {email: this.userName_u};
      this.service.editProfile(currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);alert(response.toString());alert("Changing the username may result in the lost of data!");});
    }
    if(this.password_u!=undefined){
      let changeVal = {password: this.password_u};
      this.service.editProfile(currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);alert(response.toString())});
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
  exportcal(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    window.open(this.service.APIUrl + 'ics/' + currentUser.email);
   // this.service.getIcs(currentUser.email, {responseType: 'blob'}).subscribe(data => saveAs(data));
  }

  selectedFile: any = null;

  onFileSelected(event:any){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    
  }
   
  onUpload(){

    const fd= new FormData;
    fd.append('calendar',this.selectedFile, this.selectedFile.Name )
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.importIcs(currentUser.email,this.selectedFile).subscribe(response =>{console.log('server response: ', response);});;
    
  }


  

}
