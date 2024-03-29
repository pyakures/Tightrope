import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-local-events',
  templateUrl: './local-events.component.html',
  styleUrls: ['./local-events.component.css'],
})
export class LocalEventsComponent implements OnInit {
  constructor(private AuthReRoute: Router, private service: SharedService) {}
  LocalEventsList: any = [];

  new_Local = {
    EventName: '',
    EndDate: '',
    EventType: '',
    Location: '',
    Notes: '',
    StartDate: '',
    StressLevel: '',
    UserEmail: '',
  };

  state: any;
  city: any;

  isLoading = false;
  ngOnInit(): void {}

  onSubmit() {
    if (this.city != undefined && this.state != undefined) {
      let changeVal = { city: this.city, state: this.state };
      this.displayLocalEvents(changeVal);
      console.log(changeVal);
    }
  }

  //Gets local events from api and stores in local variable
  displayLocalEvents(changeVal: any) {
    this.isLoading = true;
    console.log('Display Local Events:');
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service
      .getLocalEvents(currentUser.email, changeVal)
      .subscribe((data) => {
        this.LocalEventsList = data;
        console.log(this.LocalEventsList);
        this.isLoading = false;
      });
  }

  //Method allows new window to be opened when 'more-info' button is pressed
  LinktoMoreInfo(event: string) {
    window.open(event);
  }

  addLocalEvent(eventData: any) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    //Parses event data from selected event to the new event so userEmail can be added to the object
    this.new_Local = {
      EventName: eventData.EventName,
      EventType: eventData.EventType,
      EndDate: eventData.EndDate,
      StartDate: eventData.StartDate,
      Location: eventData.Location,
      Notes: eventData.Notes,
      StressLevel: eventData.StressLevel,
      UserEmail: currentUser.email,
    };
    console.log('added new event selected:', this.new_Local);
    //Adds new local event to user's calendar
    this.service.addEvent(this.new_Local).subscribe((res) => {
      alert(res.toString());
      this.AuthReRoute.navigate(['/home']);
    });

    //returns to home page
  }
}
