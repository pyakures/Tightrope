import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-streak',
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.css']
})
export class StreakComponent implements OnInit {

  constructor(private service:SharedService) { }

  ngOnInit(): void {
  }

}
