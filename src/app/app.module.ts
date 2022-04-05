import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { AppointmentComponent } from './appointment/appointment.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
import { ReportsComponent } from './reports/reports.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PaymentComponent } from './payment/payment.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { ReportDialogComponent3 } from './report-dialog/report-dialog.component';
import { UserComponent } from './user/user.component';
import { DoctorComponent } from './doctor/doctor.component';
import { TableComponent } from './table/table.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogOverviewExampleDialog } from './dialog/dialog.component';
import { PrescriptionDialogComponent } from './prescription-dialog/prescription-dialog.component';
import { DialogOverviewExampleDialog1 } from './prescription-dialog/prescription-dialog.component';
import { DialogOverviewExampleDialog2 } from './recorddialog/recorddialog.component';

import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { InsurancestaffComponent } from './insurancestaff/insurancestaff.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { Auth2fComponent } from './auth2f/auth2f.component';
import { Auth2fRegistrationComponent } from './auth2f-registration/auth2f-registration.component';

import { DocNamePipe } from './doc-name.pipe';
import { PendingAppointmentsComponent } from './pending-appointments/pending-appointments.component';
import { RecorddialogComponent } from './recorddialog/recorddialog.component';
import { LabRequestComponent } from './lab-request/lab-request.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { PayementDetailsComponent } from './payement-details/payement-details.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CompletedBillsComponent } from './completed-bills/completed-bills.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { AllUsersComponent } from './all-users/all-users.component';

import { MatKeyboardModule } from 'angular-onscreen-material-keyboard';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppointmentComponent,
    ToolbarComponent,
    CreateAppointmentComponent,
    ViewAppointmentComponent,
    ReportsComponent,
    InsuranceComponent,
    PaymentComponent,
    ReportDialogComponent,
    ReportDialogComponent3,
    ReportDialogComponent,
    UserComponent,
    TableComponent,
    ConfirmDialogComponent,
    InsurancestaffComponent,
    DialogComponent,
    DialogOverviewExampleDialog,
    PrescriptionDialogComponent,
    DialogOverviewExampleDialog1,
    DialogOverviewExampleDialog2,
    DoctorComponent,
    ChatComponent,
    MessageComponent,
    ChatbotComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    Auth2fComponent,
    Auth2fRegistrationComponent,
    DocNamePipe,
    PendingAppointmentsComponent,
    RecorddialogComponent,
    LabRequestComponent,
    CreateTransactionComponent,
    PayementDetailsComponent,
    TransactionsComponent,
    CompletedBillsComponent,
    MakePaymentComponent,
    AdminRegistrationComponent,
    AllUsersComponent,

  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    MatIconModule,
    AppRoutingModule,
    CommonModule,
    MatKeyboardModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  // exports: [MaterialModule],
  providers: [
    ChatService,
    authInterceptorProviders,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
