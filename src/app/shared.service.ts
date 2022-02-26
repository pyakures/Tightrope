import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from  'rxjs';
import { HttpHeaders } from '@angular/common/http';


//This little variable right here lets us send authentication along side our requests 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'null'
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
  //Must the EventID only, Delete CRUD functions dont have a "body" to attach to the request, val must be the EventID
  deleteEvent(val:number){
    return this.http.delete<any[]>(this.APIUrl + 'events/' + val)
  } 

  getStressPredict(userEmail:any){
    return this.http.get<any[]>(this.APIUrl + 'predict/', userEmail)
  }

  getStressfullDay(userEmail:any){
    return this.http.get<any[]>(this.APIUrl + 'stressday/', userEmail)
  }


  getProfile(){
    console.log(localStorage.getItem('token'))
    return this.http.get<any[]>(this.APIUrl + 'accounts/', httpOptions)
=======
  //This API will get the current users account information (password is hashed)
  //This will likely not be used by the front end but the following lines of code will allow access to the user profile info
  //
  //var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  //this.service.getProfile(currentUser.token).subscribe(data=>{this.userVar=data})
  //
  //Explaining the above code:
  //Grab the current user from local storage
  //use the token to identify the user and pull their user data
  //Note: the userVar is a place holder variable and maybe renamed
  getProfile(token:string){
    httpOptions.headers = httpOptions.headers.set('Authorization','Token ' + token);
    return this.http.get<any[]>(this.APIUrl + 'accounts/profile/',httpOptions)
  }

  //This API will add a user to the data base
  //Required fields (in order (I think)): username, first_name, last_name, email, password
  //Note: "val" must have all of those fields
  //Note: Anyone can add a user to the database, it requires no authorization, hence the unqiue URL
  addProfile(val:any){

>>>>>>> Stashed changes
  }
}
