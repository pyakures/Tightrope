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
    { name: 'The Body Scan', duration: '5-30 minutes', description:'Body scanning involves paying attention to parts of the body and bodily sensations in a gradual sequence from feet to head.',
     url:'https://www.verywellmind.com/body-scan-meditation-why-and-how-3144782', value: 1 },
    { name: 'Mindful Seeing', duration: '10 minutes', description:'Mindful Seeing is an exercise that aides inddividuals with the idea that a lack of visual stimuli is stifling.', 
    url:'https://www.elitedaily.com/p/what-is-mindful-seeing-meditation-doesnt-have-to-be-done-with-your-eyes-closed-expert-says-12220557', value: 4 },
    { name: 'Mindful Listening', duration: '15 minutes', description:'In general, people thrive when they feel fully “heard” and “seen,” and mindful listening offers a break from focusing on the self or our own response ', 
    url:'https://positivepsychology.com/mindfulness-exercises-techniques-activities/', value: 5 },
    { name: 'The Self-Compassion Pause', duration: '2-5 minutes', description:'This mindfulness exercise on self-compassion will help you treat yourself the way that you do others who are in need.', 
    url:'https://mindfulnessexercises.com/self-compassion-pause/ ', value: 6 },
    { name: 'Five Senses Exercise',  duration: '5 minutes', description:'The goal is to calm your mind by using your five senses to focus on your environment instead of your thoughts.', 
    url:'https://medcenterblog.uvmhealth.org/wellness/physical/mindfulness-mindful-monday-exercise/ ', value: 7 },
    { name: '3-Step Mindfulness Exercise', duration: '5 minutes', description:'Step 1:step out of  “auto-pilot” to bring awareness to what you are doing, thinking, and sensing at this moment. Step 2:bring awareness to the breathing for six breaths or a minute. Step 3: expand awareness outward, first to the body then to the environment.', 
    url:'https://positivepsychology.com/mindfulness-exercises-techniques-activities/ ', value: 8 },
    { name: '3-Minute Breathing Space', duration: '3 minutes', description:'The purpose of the 3-minute breathing space is to help you step out of automatic pilot, move into the present moment and slow down so you can respond more skillfully to stressful situations.',
     url:' https://mindfulnessandwellbeing.com/resources/', value: 9 },
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
  //Method allows new window to be opened when 'more-info' button is pressed
  LinktoMoreInfo(event: string){
    window.open(event);
  }

  skipMindful(){
    this.AuthReRoute.navigate(['/initialStresssurvey']);
  }
}
