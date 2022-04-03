import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError } from  'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ObjectType } from 'typescript';

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
readonly APIUrl = "https://tightropeapi.herokuapp.com/"
//readonly APIUrl = 'http://127.0.0.1:8000/'

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
    .pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    )
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


  //Returns stress gauge number as a decimal value (ex. 0.25)
  //Must pass useremail 
  getStressPredict(userEmail:any){
    return this.http.get<any[]>(this.APIUrl + 'predict/' + userEmail)
  }

  //Returns most stressful day in the week - just one
  //Returns as a string
  getStressfullDay(userEmail:any){
    return this.http.get<any[]>(this.APIUrl + 'stressday/'+ userEmail, userEmail)
  }

  //Returns count of stressful events in the week 
  //Whole value returned
  getStressEvents(userEmail:any){
    return this.http.get<any[]>(this.APIUrl + 'stresscounter/' + userEmail, userEmail)
  }

  //Returns time worked this week in minutes, long value 
  getTotalStress(userEmail:any){
    return this.http.get<any[]>(this.APIUrl + 'worktime/' + userEmail, userEmail)
  }

  //returns both Completed leisure activities and then scheduled leisure activities 
  //completed first then scheduled 
  getMindfulnessCount(userEmail:any){
    return this.http.get<any[]>(this.APIUrl + 'mindfulnesscounter/' + userEmail, userEmail)
  }


  // adds event to the user's mindfulness preferences
  //val is the user preference and is a dictionary value: dictionary = {mindfulPrefereneIDs: array_of_integers}
  postUserMindfulnessPreferences(userEmail:any, val:any){
    console.log(val)
    return this.http.post<any[]>(this.APIUrl + 'mindfulpreference/' + userEmail, val)
    .pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    )
  }

  //updates user's mindfulness preferences
  //val is the user preference and is a dictuonary value: 
  updateUserMindfulnessPreferences(userEmail: any, val:any){
    return this.http.put<any[]>(this.APIUrl + 'mindfulpreference/' + userEmail, val)
  }


  //Post initial stress survey data
  //takes in dictionary for val from survey: dictionary = {Useremail:"", SurveySum:""}
  postSurveyData(useremail:any, val:any){
    return this.http.post<any[]>(this.APIUrl + 'stresssurvey/' + useremail, val)
  }

  //Updates stress survey data
  //takes in dictionary for val from survey: dictionary = {Useremail:"", SurveySum:""}
  updateSurveyData(useremail:any, val:any){
    return this.http.put<any[]>(this.APIUrl + 'stresssurvey/' + useremail, val)
  }

  
  //Local Events Recommendations
  //only takes in user's email as a string
  getLocalEvents(useremail:any){
    return this.http.get<any[]>(this.APIUrl + 'localevents/' + useremail, useremail)
  }
  
  //Mindful Event Recommendations
  //only takes in user's email as a string 
  getMindfulEvents(useremail:any){
    return this.http.get<any[]>(this.APIUrl + "mindfulnessrecommender/" + useremail, useremail)
  }



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
  //
  //Additional Notes for Integration: The following lines of code are a way that the user ~could~ be added, this is a hardcoded solution
  //so it will need to be adapted, but this is confirmed to work by michael (may not work if placed in the ngOnInIt, cause that thing sucks)
  //
  //let userVar = {username: 'newUser@test.com', first_name: 'New', last_name: 'User', email: 'newUser@test.com', password:'tightrope'};
  //this.service.addProfile(userVar).subscribe(response =>{console.log('server response: ', response);});
  //
  //Additional Notes on the above lines of code:
  //The "let" decorator and the subscribe function are key for this API working, not 100% sure why, disassemble those lines of code at your own risk
  addProfile(val:any){
    return this.http.post<any[]>(this.APIUrl + 'accounts/profileAdd/',val)
  }

  //This API will change a single aspect of a users profile
  //Required fields in order: token (of the current user), a key value pair of what youd like to change
  //Options for change: email (set bot the username and email to the passed value), password, first_name, last_name, username (not applicable because username and password will be equal always)
  //Note: Users must be logged in/authenticated to perform these operations
  //
  //Additional Notes for Integration: The following lines of code are a way that the user ~could~ be edited, this is a hardcoded solution
  //so it will need to be adapted, but this is confirmed to work by michael (may not work if placed in the ngOnInIt, cause that thing sucks)
  //
  //To change the email of the current User
  //let changeVal = {email: 'test@test.com'};
  //this.service.editProfile(this.currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);});
  //
  //To change the password of the current User
  //let changeVal = {password: 'newpassword'};
  //this.service.editProfile(this.currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);});
  //
  //To change the first_name of the current User
  //let changeVal = {first_name: 'first Name'};
  //this.service.editProfile(this.currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);});
  //
  //To change the last_name of the current User
  //let changeVal = {last_name: 'last Name'};
  //this.service.editProfile(this.currentUser.token, changeVal).subscribe(response =>{console.log('server response: ', response);});
  //
  editProfile(token:string, val:any){
    httpOptions.headers = httpOptions.headers.set('Authorization','Token ' + token);
    return this.http.put<any[]>(this.APIUrl + 'accounts/profile/', val, httpOptions)
  }

  //This API will delete a user from the database
  //Required Fields: token (of the current user)
  //Note: it will provide no auto logout feature, so the user must be logged out of the front end by the front end
  //
  //Additional Notes for Integration: The following lines of code are a way that the user ~could~ be deleted, this is a hardcoded solution
  //so it will need to be adapted, but this is confirmed to work by michael (may not work if placed in the ngOnInIt, cause that thing sucks)
  //
  //this.service.deleteProfile(this.currentUser.token).subscribe(response =>{console.log('server response: ', response);});
  //
  //This one is pretty simple ngl
  deleteProfile(token:string){
    httpOptions.headers = httpOptions.headers.set('Authorization','Token ' + token);
    return this.http.delete<any[]>(this.APIUrl + 'accounts/profile/', httpOptions)
  }


  //This API will return a list object, contiaing two instances of list objects, the user data of the passed user email
  //and the mindfulness events that have occured since their last Login
  //
  //This API should be called when the user logs in
  //
  //Required fields: No HTTP body is needed (over the normal), only the user email attached to the URL as shown
  //
  //Additional Notes for Integration: The following lines of code are a way that this could be implemented.
  //I RECOMMEND AGAINST IT
  //This puts all mindful events into local storage (could be very large) as well as the streaks record
  //Im just not good enough at TS to get this to run other ways
  //I would suggest putting the Streaks user data in local storage and doing something else with the mindful event data
  //
  //this.service.getStreaks(currentUser.email).subscribe(response =>{localStorage.setItem("streaksData", JSON.stringify(response))});
  //
  //NOTE: There will be two data points (as outlined above) in a list that you will need to sort through
  //something like [[userdata],[allEligibleEvents]], so handling that may be a bit more tricky
  //I suggest saving the userdata portion to local storage for acces by the PUT method later
  getStreaks(userEmail:any): Observable<any>{
    return this.http.get<any[]>(this.APIUrl + 'streaks/' + userEmail)
  }

  //This API will take in the current users email and use it to create a default, inital streaks record for them
  //Required fields: user email, which is passed in the body and in the URL even though its only needed in the URL, POST operations must have a body ¯\_(ツ)_/¯
  //
  //THIS API MUST BE CALLED WHEN THE USER CREATES THEIR ACCOUNT ALL IT NEEDS IS THEIR EMAIL, i manually added a profile for test@test.com
  //
  //Additional Notes for Integration: the solution should go fine if called when a user makes a profile
  //this.service.addStreaks(currentUser.email).subscribe(response =>{console.log('server response: ', response);});
  addStreaks(userEmail:any){
    return this.http.post<any[]>(this.APIUrl + 'streaks/' + userEmail,userEmail)
    .pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    )
  } 
  //This API will take in the current version of the User Streak Data that is obtained from the GET method and updates it with the new streak count (post login)
  //Reqiured fields: UserID, UserEmail, StreakCount, LastLogin
  //
  //Additional Notes for Integration: this is a possible solution, most likely will need to be adapted
  //var streaksData = { "UserID": 1,
  //                    "UserEmail": "test@test.com",
  //                    "StreakCount": 27,
  //                    "LastLogin": "2022-03-10T00:30:00Z"};
  //console.log(streaksData);
  //this.service.updateStreaks(streaksData).subscribe(response =>{console.log('server response: ', response);});
  updateStreaks(userStreaksData:any){
    return this.http.put<any[]>(this.APIUrl + 'streaks/', userStreaksData)
  }

  //This API is for deleting user records in this table, dont worry about it for the front end ;)
  deleteStreakRecord(UserID:number){
    return this.http.delete<any[]>(this.APIUrl + 'streaks/' + UserID)
  } 

  getIcs(userEmail:any): Observable<any>{
    return this.http.get(this.APIUrl + 'ics/' + userEmail, {responseType: 'blob'});
  }

  getIndividualIcs(userEmail:any, val:any): Observable<any>{
    return this.http.put(this.APIUrl + 'ics/' + userEmail, val, {responseType: 'blob'});
  }
  
  
  importIcs(userEmail:any, val:any){
    return this.http.post(this.APIUrl + 'ics/' + userEmail,val, {responseType:'blob'});
  }


}

