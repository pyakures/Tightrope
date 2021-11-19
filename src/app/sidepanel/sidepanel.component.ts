import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',       
  styleUrls: ['./sidepanel.component.css'], 
  
 
})
export class SidepanelComponent implements OnInit {

  constructor() { }
  monthstring = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  d = new Date();
  month = this.d.getMonth();
  year = this.d.getUTCFullYear();
  monthname = this.monthstring[this.month] + " " + this.year;
  monthALLCAPS= this.monthname.toUpperCase();


  config = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    
  };

  ngOnInit(): void {
  }

}

