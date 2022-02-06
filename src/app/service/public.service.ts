import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  apiURL = "http://localhost:8000/"
  constructor(private http:HttpClient) { }

  //Can use this in any part of the app this is a way to access the login API URL
  getMessage(){
    return this.http.get(this.apiURL);
  }
}
