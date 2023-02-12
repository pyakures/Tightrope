import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-initial-questions',
  templateUrl: './initial-questions.component.html',
  styleUrls: ['./initial-questions.component.css'],
})
export class InitialQuestionsComponent implements OnInit {
  constructor(private AuthReRoute: Router, private service: SharedService) {}

  //Initialize question values at 0
  q1: number = 0;
  q2: number = 0;
  q3: number = 0;
  q4: number = 0;
  q5: number = 0;
  q6: number = 0;
  q7: number = 0;
  q8: number = 0;
  q9: number = 0;
  q10: number = 0;

  sum: number = 0;

  result: any;

  ngOnInit(): void {}
  //Function Calculates Perceived Stress Score according to the resource pdf
  //Once Survey is complete, user is routed to home screen w Calendar
  //Q4,5,6,8 are inverted per the PSS scoring
  setValue() {
    var q1 = this.q1;
    var q2 = this.q2;
    var q3 = this.q3;
    var q4 = Math.abs(this.q4 - 4);
    var q5 = Math.abs(this.q5 - 4);
    var q6 = Math.abs(this.q6 - 4);
    var q7 = this.q7;
    var q8 = Math.abs(this.q8 - 4);
    var q9 = this.q9;
    var q10 = this.q10;

    this.sum = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10;
    //For now the sum is exported to the console log
    console.log('Sum: ', this.sum);

    this.postValue();

    //Reroute to home
    this.AuthReRoute.navigate(['/home']);
  }

  postValue() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.result = { UserEmail: currentUser.email, SurveyValue: this.sum };
    console.log(this.result);
    this.service
      .postSurveyData(currentUser.email, this.result)
      .subscribe((res) => {
        alert(res.toString());
      });
  }

  skipSurvey() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.result = { UserEmail: currentUser.email, SurveyValue: this.sum };
    console.log(this.result);
    this.service.postSurveyData(currentUser.email, this.result).subscribe();

    this.AuthReRoute.navigate(['/home']);
  }
}
