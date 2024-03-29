import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api_url: string = environment.backendUrl;
  constructor(private http: HttpClient, private AuthReRoute: Router) {}

  //A service to check with the Backend API for if a user exists in the backend database
  //Checks the given username (email) and password are in the api_url+accounts/api/auth with routes to the API
  login(username: string, password: string) {
    return this.http
      .post<any>(
        this.api_url + 'accounts/api/auth/',
        { username, password },
        httpOptions
      )
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }
  //Removes the currentUser record from the local storage
  logout() {
    {
      localStorage.removeItem('currentUser');
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  canActivate() {
    if (this.isLoggedIn !== true) {
      this.AuthReRoute.navigate(['login']);
    }
    return true;
  }
}
