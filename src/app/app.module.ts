//Auto Generated module inclusion by angular
import { NgModule,Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from './calendar.service';
import { BannerComponent } from './banner/banner.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { LoginComponent } from './login/login.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { GaugeModule } from 'angular-gauge';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AboutComponent } from './about/about.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NeweventComponent } from './newevent/newevent.component';
import { ContactComponent } from './contact/contact.component';
import { FeaturesComponent } from './features/features.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedService } from './shared.service';

import{HttpClientModule} from '@angular/common/http';
import { EditeventComponent } from './editevent/editevent.component';
import { AccountComponent } from './account/account.component';
import { StreakComponent } from './streak/streak.component';
import { StresssurveyComponent } from './stresssurvey/stresssurvey.component';
import { QuestionsComponent } from './stresssurvey/questions/questions.component';
import { InitialMindfulComponent } from './signup/initial-mindful/initial-mindful.component';
import { ChangeMindfulComponent } from './change-mindful/change-mindful.component';
import { InitialStresssurveyComponent } from './signup/initial-stresssurvey/initial-stresssurvey.component';
import { InitialQuestionsComponent } from './signup/initial-stresssurvey/initial-questions/initial-questions.component';
import { LocalEventsComponent } from './local-events/local-events.component';
import { Error404Component } from './error404/error404.component';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    BannerComponent,
    SidepanelComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    AboutComponent,
    NeweventComponent,
    ContactComponent,
    FeaturesComponent,
    EditeventComponent,
    AccountComponent,
    StreakComponent,
    StresssurveyComponent,
    QuestionsComponent,
    InitialMindfulComponent,
    ChangeMindfulComponent,
    InitialStresssurveyComponent,
    InitialQuestionsComponent,
    LocalEventsComponent,
    Error404Component,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    GaugeModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  providers: [
    CalendarService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
