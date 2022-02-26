import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from  'rxjs';
import { HttpHeaders } from '@angular/common/http';


//This little variable right here lets us send authentication along side our requests 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Token ' + 'null'
  })
};
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  sharedid:any;
//Django API URL
//readonly APIUrl = "https://tightropeapi.herokuapp.com/"
readonly APIUrl = 'http://127.0.0.1:8000/'

  constructor(private http:HttpClient) { }
  //Send a get method (called using the users email)
  //Returns events from the event table pertaining to the user
  getEvents(userEmail:any):Observable<any>{
    return this.http.get<any[]>(this.APIUrl + 'events/' + userEmail)
  }
  //Add event by sending a POST request (called using the users email)
  //Must pass all required data fields, not including the 
  //auto generated "EventID" field, which will populate when added
  //Should have a UserEmail, EventName, StartDate, EndDate, EventType, StressLevel, and Notes
  addEvent(val:any){
    return this.http.post<any[]>(this.APIUrl + 'events/' + val, val)
  } 
  //Edit event w put event
  //Must pass all required data fields including eventID
  updateEvent(val:any){
    return this.http.put<any[]>(this.APIUrl + 'events/' + val, val)
  }
  //Delete event w delete
  //Must pass all required data fields including eventID
  deleteEvent(val:number){
    return this.http.delete<any[]>(this.APIUrl + 'events/' + val)
  } 

  getStressPredict(userEmail:any){
    return this.http.get<any[]>(this.APIUrl + 'stresspredict/' + userEmail, userEmail)
  }

  getProfile(){
    console.log(localStorage.getItem('token'))
    return this.http.get<any[]>(this.APIUrl + 'accounts/', httpOptions)
  }
}
