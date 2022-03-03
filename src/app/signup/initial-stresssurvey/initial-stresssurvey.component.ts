import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-initial-stresssurvey',
  templateUrl: './initial-stresssurvey.component.html',
  styleUrls: ['./initial-stresssurvey.component.css']
})
export class InitialStresssurveyComponent implements OnInit {

  constructor(private AuthReRoute: Router, private service:SharedService) { }

  ngOnInit(): void {
  }
  result:any;
  sum: number = 0;

  skipSurvey(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.result = { UserEmail : currentUser.email, SurveyValue : this.sum};
    console.log(this.result);
    this.service.postSurveyData(currentUser.email, this.result).subscribe();

    this.AuthReRoute.navigate(['/home']);

  }

}
