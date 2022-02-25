/*Custom code section by Michael Dorado*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name:any; 
  email:any; 
  message:any; 

  isShow = true;

  AllMessages:any=[];
  constructor() { 

  }

  ngOnInit(): void {
  }

  contactDevelopers(){
    
    const contact = `Hello my name is ${this.name}. My email is ${this.email}. My message is "${this.message}".`
    //console.log(contact);

    this.AllMessages.push(contact);

    //console.log(this.AllMessages);

    //Messages do not go anywhere 
    alert('Your feedback is appreciated!');
  }

  hiddenFunction(){
      alert('You found the secret function!');
      this.isShow = !this.isShow;
  }
}
