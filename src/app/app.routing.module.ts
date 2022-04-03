import { InsurancestaffComponent } from './insurancestaff/insurancestaff.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PaymentComponent } from './payment/payment.component';
import { ReportsComponent } from './reports/reports.component';
import { UserComponent } from './user/user.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: DashboardComponent,
  // },
  {
    path: 'dashbaord',
    component: DashboardComponent,
  },
  {
    path: 'appointments',
    component: AppointmentComponent,
  },
  {
    path: 'patients',
    component: UserComponent,
  },
  {
    path: 'diagnosis',
    component: UserComponent,
  },
  {
    path: 'prescription',
    component: UserComponent,
  },
  {
    path: 'insurance',
    component: InsuranceComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'chat',
    component: ChatbotComponent,
  },
  {
    path: 'records',
    component: UserComponent,
  },
  {
    path: 'insurancestaff',
    component: InsurancestaffComponent,
  },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: DashboardComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
