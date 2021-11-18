import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',       
  styleUrls: ['./sidepanel.component.css'], 
  
 
})
export class SidepanelComponent implements OnInit {

  constructor() { }
  monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  thisMonth = this.monthNames[(new Date()).getMonth()];



  config = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    
  };

  ngOnInit(): void {
  }

}

