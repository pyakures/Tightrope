import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',       
  styleUrls: ['./sidepanel.component.css'], 
  
 
})
export class SidepanelComponent implements OnInit {

  constructor() { }

  config = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    
  };

  ngOnInit(): void {
  }

}

