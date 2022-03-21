import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'

import {MatButtonModule} from '@angular/material/button';
import { AppointmentComponent } from './appointment/appointment.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
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

import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot/chatbot.component';

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
    DialogComponent,
    DialogOverviewExampleDialog,
    PrescriptionDialogComponent,
    DialogOverviewExampleDialog1,
    DoctorComponent,
    ChatComponent,
    MessageComponent,
    ChatbotComponent
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
    CommonModule
  ],
  // exports: [MaterialModule],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
