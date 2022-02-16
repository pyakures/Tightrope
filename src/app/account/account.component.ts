import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    
  }

}
