import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

//Django API URL - will need to reroute w/ Heroku
readonly APIUrl = "http://127.0.0.1:8000/"

  constructor(private http:HttpClient) { }

  //Add event w post new event 
  //Edit event w put event
  //Delete event w delete 
  
}
