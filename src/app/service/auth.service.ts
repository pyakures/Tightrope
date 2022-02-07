import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_url: string = 'https://tightropeapi.herokuapp.com/';
  constructor(private http: HttpClient) { }

  //A service to check with the Backend API for if a user exists in the backend database
  //Checks the given username (email) and password are in the api_url+accounts/api/auth with routes to the API
  login(username:string, password:string){
    return this.http.post<any>(this.api_url+'accounts/api/auth/',
      {username, password}, httpOptions).pipe(
        map(user => {
          if(user && user.token){
            localStorage.setItem("currentUser", JSON.stringify(user))
          }
          return user;
        })
      );
  }
  //Removes the currentUser record from the local storage
  logout(){{
    localStorage.removeItem('currentUser');
  }}
}
 