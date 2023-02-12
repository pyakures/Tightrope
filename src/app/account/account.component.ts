import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { saveAs } from 'file-saver';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-account',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  userVar: any;
  firstName_u: any;
  lastName_u: any;
  userName_u: any;
  password_u: any;

  firstName: any;
  lastName: any;
  fullName: any;
  Useremail: any;

  constructor(
    private authService: AuthService,
    private AuthReRoute: Router,
    private service: SharedService
  ) {}

  ngOnInit(): void {
    this.getAccountInfo();
  }
  onSubmit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (this.firstName_u != undefined) {
      let changeVal = { first_name: this.firstName_u };
      this.service
        .editProfile(currentUser.token, changeVal)
        .subscribe((response) => {
          console.log('server response: ', response);
          alert(response.toString());
        });
    }
    if (this.lastName_u != undefined) {
      let changeVal = { last_name: this.lastName_u };
      this.service
        .editProfile(currentUser.token, changeVal)
        .subscribe((response) => {
          console.log('server response: ', response);
          alert(response.toString());
        });
    }
    if (this.userName_u != undefined) {
      let changeVal = { email: this.userName_u };
      this.service
        .editProfile(currentUser.token, changeVal)
        .subscribe((response) => {
          console.log('server response: ', response);
          alert(response.toString());
          alert('Changing the username may result in the lost of data!');
        });
    }
    if (this.password_u != undefined) {
      let changeVal = { password: this.password_u };
      this.service
        .editProfile(currentUser.token, changeVal)
        .subscribe((response) => {
          console.log('server response: ', response);
          alert(response.toString());
        });
    }
    this.AuthReRoute.navigate(['/home']);
  }
  getAccountInfo() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.getProfile(currentUser.token).subscribe((data) => {
      this.userVar = data;
      this.firstName = this.userVar.userFirstName;
      this.lastName = this.userVar.userLastName;
      this.fullName = this.firstName + ' ' + this.lastName;
      this.Useremail = this.userVar.user;
    });
  }
  deactivate() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.service.deleteProfile(currentUser.token).subscribe((response) => {
      console.log('server response: ', response);
    });
    alert('Account Deactivated!');
    this.authService.logout();
    this.AuthReRoute.navigate(['/login']);
  }
  exportcal() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

    this.service.getIcs(currentUser.email).subscribe((response: any) => {
      //when you use stricter type checking
      let blob: any = new Blob([response], {
        type: 'text/calendar; charset=utf-8',
      });
      //console.log(blob);
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      var nameoffile: string = currentUser.email + '_calendar.ics';
      saveAs(blob, nameoffile);
    });
  }

  selectedFiles?: FileList;
  currentFile?: File;
  filename: any = 'Import Calendar';
  message = '';
  fileInfos?: Observable<any>;

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.filename = this.currentFile.name;
      }
    }
  }

  /*onFileSelected(event:any){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    
  }*/

  onUpload(): void {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.service.importIcs(currentUser.email, this.currentFile).subscribe(
          (event: any) => {
            if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
            alert('Event have been imported to the calendar!');
          },
          (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        );
      }
      this.selectedFiles = undefined;
    }
  }
}
