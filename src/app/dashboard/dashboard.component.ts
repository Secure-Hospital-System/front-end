import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  patientDashBoard = [
    {
      title: 'Appointments',
      icon: 'local_hospital',
      redirectUrl: '/appointments',
    },
    {
      title: 'Records',
      icon: 'description',
      redirectUrl: '',
    },
    {
      title: 'User Profile',
      icon: 'person',
      redirectUrl: '/patients',
    },
    {
      title: 'Reports',
      icon: 'description',
      redirectUrl: '/reports',
    },
    {
      title: 'Payments',
      icon: 'payment',
      redirectUrl: '/payment',
    },
    {
      title: 'Insurance',
      icon: 'favorite',
      redirectUrl: '/insurance',
    },
    {
      title: 'Diagnosis',
      icon: 'storage',
      redirectUrl: '/diagnosis',
    },
    {
      title: 'Prescription',
      icon: 'description',
      redirectUrl: '/prescription',
    },
  ];

  constructor() {}

  ngOnInit(): void {

  }

  navigate(){
    // this.router.navigate(['/app-appointment'])
  }
}
