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
import { ExampleComponent } from './example/example.component';
import { ShowEventsComponent } from './example/show-events/show-events.component';
import { EidtEventsComponent } from './example/eidt-events/eidt-events.component';


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
    ExampleComponent,
    ShowEventsComponent,
    EidtEventsComponent,

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
