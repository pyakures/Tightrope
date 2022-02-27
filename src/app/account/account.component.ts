import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  firstName = this.currentUser.userFirstName;
  lastName = this.currentUser.userLastName;
  fullName= this.firstName + " " + this.lastName;
  Useremail= this.currentUser.email;

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  }
  OnSubmit():void{   
  }
}
