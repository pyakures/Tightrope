import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  apiURL = environment.backendUrl;
  constructor(private http: HttpClient) {}

  //Can use this in any part of the app this is a way to access the login API URL
  getMessage() {
    return this.http.get(this.apiURL);
  }
}
