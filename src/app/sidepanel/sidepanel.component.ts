//Custom Code by Sahil Pyakurel
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',       
  styleUrls: ['./sidepanel.component.css'], 
  
 
})
export class SidepanelComponent implements OnInit {

  //AuthService is for the logout, AuthReRoute is to route the page after logout is pressed
  constructor(private authService: AuthService, private AuthReRoute: Router){}

  //constructor() { }
  //a method to return the current month to the side panel by Sahil Pyakurel
  monthstring = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  d = new Date();
  month = this.d.getMonth();
  year = this.d.getUTCFullYear();
  monthname = this.monthstring[this.month] + " " + this.year;
  monthALLCAPS= this.monthname.toUpperCase();

  
 
  config = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    
  };

  currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  firstName = this.currentUser.userFirstName;
  lastName = this.currentUser.userLastName;
  fullName= this.firstName + " " + this.lastName;


  
  ngOnInit(): void {
    }
  

    //Call /service/AuthService logout function
    logout() {
      this.authService.logout();
      //Reroute to the login page
      this.AuthReRoute.navigate(['/login'])
    }

}

