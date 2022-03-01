import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AboutComponent } from './about/about.component';
import { NeweventComponent } from './newevent/newevent.component';
import { FeaturesComponent } from './features/features.component';
import { EditeventComponent } from './editevent/editevent.component';
import { AccountComponent } from './account/account.component';
import { StreakComponent } from './streak/streak.component';
import { StresssurveyComponent } from './stresssurvey/stresssurvey.component';
import { QuestionsComponent } from './stresssurvey/questions/questions.component';
import { InitialMindfulComponent } from './signup/initial-mindful/initial-mindful.component';
import { ChangeMindfulComponent } from './change-mindful/change-mindful.component';

//Rougting done by all members of the team manually
const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'home',component:CalendarComponent},
{path:'signup',component:SignupComponent},
{path:'forgot-password',component:ForgotPasswordComponent},
{path:'about',component:AboutComponent},
{path: 'newevent',component:NeweventComponent},
{path: 'contact', component:ContactComponent},
{path: 'features', component:FeaturesComponent},
{path: 'editevent', component:EditeventComponent},
{path: 'account', component:AccountComponent},
{path: 'streak', component:StreakComponent},
{path: 'stresssurvey', component:StresssurveyComponent},
{path: 'questions', component:QuestionsComponent},
{path: 'initialMindful', component: InitialMindfulComponent},
{path: 'changeMindful', component:ChangeMindfulComponent},
{path: '', redirectTo: '/login', pathMatch: 'full'}, //this is routing the main page of our website to the login page, this is temporary as i am not sure what we are going to be adding on the main page yet


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
