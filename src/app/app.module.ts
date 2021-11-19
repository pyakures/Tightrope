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
    NgbModule
  ],
  providers: [
    CalendarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
