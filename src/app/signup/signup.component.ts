//Auto generated code by Angular
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDayViewComponent } from 'angular-calendar';
import { setHours, startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, setMinutes } from 'date-fns';
import { Subject } from 'rxjs';
import {first} from 'rxjs/operators'
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
  selector: 'app-signup',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private AuthReRoute: Router, private service:SharedService) { }

  firstName:any;
  lastName:any;
  email:any;
  password:any;
  repeatPassword:any;

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.password==this.repeatPassword){    
      let userVar = {username: this.email, first_name: this.firstName, last_name: this.lastName, email: this.email, password: this.password};
      this.service.addProfile(userVar).subscribe(response =>{
        console.log('server response: ', response);
        //add streaks api call when user first creates an account
        this.service.addStreaks(this.email);
        this.authService.login(this.email, this.password).pipe(first())
        .subscribe( data => {
                              console.log(data);
                              var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
                              if(currentUser.email == this.email){    
                                //this.service.addStreaks(currentUser.email).subscribe(response =>{console.log('server response: ', response);});
                                this.AuthReRoute.navigate(['/initialMindful'])
                              }
                            }
                  )       
      
      });
      //alert("Success. Please Login!");
      //this.AuthReRoute.navigate(['/login']);
     
      
      
    }
    else{
      alert("Passwords does not match. Please try again!");
      this.AuthReRoute.navigate(['/signup']);
    }
    

  }
}
