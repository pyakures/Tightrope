import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  firstName = this.currentUser.firstName;
  lastName = this.currentUser.lastName;
  fullName= this.firstName;

  constructor() { }

  ngOnInit(): void {
    
  }

}
