import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  sharedid:any;
//Django API URL - will need to reroute w/ Heroku
readonly APIUrl = "https://tightropeapi.herokuapp.com/"

  constructor(private http:HttpClient) { }
  //Send a get method (called using the users email)
  //Returns events from the event table pertaining to the user
  getEvents(userEmail:any):Observable<any>{
    return this.http.get<any[]>(this.APIUrl + 'events/' + userEmail, userEmail)
  }
  //Add event by sending a POST request (called using the users email)
  //Must pass all required data fields, not including the 
  //auto generated "EventID" field, which will populate when added
  //Should have a UserEmail, EventName, StartDate, EndDate, EventType, StressLevel, and Notes
  addEvent(userEmail:any){
    return this.http.post<any[]>(this.APIUrl + 'events/', userEmail)
  } 
  //Edit event w put event
  //Must pass all required data fields including eventID
  updateEvent(userEmail:any){
    return this.http.put<any[]>(this.APIUrl + 'events/', userEmail)
  }
  //Delete event w delete
  //Must pass all required data fields including eventID
  deleteEvent(userEmail:any){
    return this.http.delete<any[]>(this.APIUrl + 'events/',userEmail)
  } 
}
