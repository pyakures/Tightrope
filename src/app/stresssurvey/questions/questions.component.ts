import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
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


    var sum = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10;
    console.log('Sum: ',sum);
  }
  ngOnInit(): void {
  }
}
