import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PaymentComponent } from './payment/payment.component';
import { ReportsComponent } from './reports/reports.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
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
    path: '**',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
