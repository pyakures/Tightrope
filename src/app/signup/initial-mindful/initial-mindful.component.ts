import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {SharedService} from 'src/app/shared.service';

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
  //Don't change the values for each activity
  activities: Array<any> = [
    { name: 'The Body Scan', value: 1 },
    { name: 'Mindful Seeing', value: 4 },
    { name: 'Mindful Listening', value: 5 },
    { name: 'The Self-Compassion Pause', value: 6 },
    { name: 'Five Senses Exercise', value: 7 },
    { name: '3-Step Mindfulness Exercise', value: 8 },
    { name: '3-Minute Breathing Space', value: 9 },
  ];

  //array for the input values to be stored
  //format for easy retrevial for backend s
  mindfulPreferenceIDs: any = [];
  test: any;
  

  constructor(fb: FormBuilder, private AuthReRoute: Router, private service:SharedService) {
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

    console.log(selectedActivities);
    //set selected array values into the mindfulIDs array
    //isolates values from FormArray object
    this.mindfulPreferenceIDs = selectedActivities.value;
    
    
    this.test = { mindfulPreferenceIDs: this.mindfulPreferenceIDs};
    console.log(this.test);

  }

  //Prints selected activities to the console at this time
  submit() {   
    
    //var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.initializeMindfulPreferences();
    //Routes to next step in initiation
    this.AuthReRoute.navigate(['/initialStresssurvey']);

  }

  //pushes the new mindfulpreferences to the backend w shared service method
  initializeMindfulPreferences():void{
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    console.log(this.test);
    //method takes in username and the mindfulPreferenceIDs as arguments (should be just the integer array)
    this.service.postUserMindfulnessPreferences(currentUser.email, this.test).subscribe(res=>{alert(res.toString());});
      
  }

}
