import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import {AuthService} from '../service/auth.service'
import {first} from 'rxjs/operators'
import {Router} from '@angular/router';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  //This defines use of the AuthService Class (in service component)
  //As well as the router class for use of re routing once
  constructor(private authService: AuthService, private router: Router, private service:SharedService) { }
  //Run this function on start up and intialize local storage
  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
  //Helper function for the login form, dont worry about it
  get f(){
    return this.myForm.controls;
  }

  //When the login button is pressed
  onSubmit(){
      //log the currentUser into the Local storage
      this.authService.login(this.f.username.value, this.f.password.value).pipe(first())
        .subscribe( data => {
                              console.log(data);
                              //Read the currentUser out of local Storage                     
                              var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
                              //If the users entered info and the currentuser info match, redirect to the homepage
                              if(currentUser.email == this.f.username.value){    
                                //get info about streaks when a user logs in
                                this.service.getStreaks(currentUser.email).subscribe(response =>{localStorage.setItem("streaksData", JSON.stringify(response)); console.log("info:",JSON.stringify(response))});
                                
                                this.router.navigate(['/home']);
                              } else {
                                alert("Incorrect email address and password combination. Try again.");
                              }
                            }
                  )
      
  }

  
}
 