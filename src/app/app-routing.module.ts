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
import { InitialStresssurveyComponent } from './signup/initial-stresssurvey/initial-stresssurvey.component';
import { InitialQuestionsComponent } from './signup/initial-stresssurvey/initial-questions/initial-questions.component';
import { LocalEventsComponent } from './local-events/local-events.component';
import { AuthService } from './service/auth.service';
import { Error404Component } from './error404/error404.component';

//Rougting done by all members of the team manually
const routes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path:'login',component:LoginComponent},
{path:'home',component:CalendarComponent, canActivate: [AuthService]},
{path:'signup',component:SignupComponent},
{path:'forgot-password',component:ForgotPasswordComponent},
{path:'about',component:AboutComponent},
{path: 'newevent',component:NeweventComponent, canActivate: [AuthService]},
{path: 'contact', component:ContactComponent},
{path: 'features', component:FeaturesComponent},
{path: 'editevent', component:EditeventComponent, canActivate: [AuthService]},
{path: 'account', component:AccountComponent, canActivate: [AuthService]},
{path: 'streak', component:StreakComponent, canActivate: [AuthService]},
{path: 'stresssurvey', component:StresssurveyComponent, canActivate: [AuthService]},
{path: 'questions', component:QuestionsComponent, canActivate: [AuthService]},
{path: 'initialMindful', component: InitialMindfulComponent, canActivate: [AuthService]},
{path: 'changeMindful', component:ChangeMindfulComponent, canActivate: [AuthService]},
{path: 'initialStresssurvey', component: InitialStresssurveyComponent, canActivate: [AuthService]},
{path: 'initialQuestions', component: InitialQuestionsComponent, canActivate: [AuthService]},
{path: 'localEvents', component: LocalEventsComponent, canActivate: [AuthService]},
{path: '**', component:Error404Component},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
