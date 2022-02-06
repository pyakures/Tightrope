import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

//Django API URL - will need to reroute w/ Heroku
readonly APIUrl = "https://tightropeapi.herokuapp.com/"

  constructor(private http:HttpClient) { }

  //Add event w post new event 
  //Edit event w put event
  //Delete event w delete 
  
}
