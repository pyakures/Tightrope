import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-initial-mindful',
  templateUrl: './initial-mindful.component.html',
  styleUrls: ['./initial-mindful.component.css']
})
export class InitialMindfulComponent implements OnInit {
   
  ngOnInit(): void {
    
  }
  form: FormGroup;

  //Display all activity options 1-7
  //Hardcoded inputs at this time
  activities: Array<any> = [
    { name: 'The Body Scan', value: 1 },
    { name: 'Mindful Seeing', value: 2 },
    { name: 'Mindful Listening', value: 3 },
    { name: 'The Self-Compassion Pause', value: 4 },
    { name: 'Five Senses Exercise', value: 5 },
    { name: '3-Step Mindfulness Exercise', value: 6 },
    { name: '3-Minute Breathing Space', value: 7 },
  ];

  constructor(fb: FormBuilder, private AuthReRoute: Router,) {
    this.form = fb.group({
     selectedActivities:  new FormArray([])
    });
  }

  //If the box is status is changed then the activity is added/removed from selected activities
  onCheckboxChange(event: any) {
    const selectedActivities = (this.form.controls.selectedActivities as FormArray);
    if (event.target.checked) {
      selectedActivities.push(new FormControl(event.target.value));
    } else {
      const index = selectedActivities.controls
      .findIndex(x => x.value === event.target.value);
      selectedActivities.removeAt(index);
    }
  }

  //Prints selected activities to the console at this time
  submit() {
    console.log(this.form.value);
    //Will be implemented once adding a new user functionality is introduced
    //this.AuthReRoute.navigate(['/home']);
  }

}
