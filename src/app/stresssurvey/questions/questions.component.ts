//Mackenzie Zappe
//2/23/2022
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
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

    this.putValue();
    //Reroute to home
    this.AuthReRoute.navigate(['/home']);
  }
  ngOnInit(): void {}

  putValue() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.result = { UserEmail: currentUser.email, SurveyValue: this.sum };
    console.log(this.result);
    this.service
      .updateSurveyData(currentUser.email, this.result)
      .subscribe((res) => {
        console.log('stress value:', this.sum);
        if (this.sum >= 0 && this.sum < 14) {
          alert('You have reported having low stress.');
        } else if (this.sum < 26) {
          alert('You have reported having moderate stress.');
        } else if (this.sum <= 40) {
          alert('You have reported having high stress.');
        }
      });
  }
}
