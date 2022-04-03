import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // displayDashboard :any ;
  displayDashboard = [
    {
      title: 'Appointments',
      icon: 'local_hospital',
      redirectUrl: '/appointments',
    },
    {
      title: 'Records',
      icon: 'description',
      redirectUrl: '/records',
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
    {
      title: 'Chatbot',
      icon: 'chat',
      redirectUrl: '/chat',
    },
    {
      title: 'InsuranceStaff',
      icon: 'person_outline',
      redirectUrl: '/insurancestaff'
    }
  ];

  hospitalStaffDashboard = [
    {
      title: 'Appointments',
      icon: 'local_hospital',
      redirectUrl: '/appointments',
    },
    {
      title: 'Records',
      icon: 'description',
      redirectUrl: '/records',
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
      title: 'Diagnosis',
      icon: 'storage',
      redirectUrl: '/diagnosis',
    },
    {
      title: 'Prescription',
      icon: 'description',
      redirectUrl: '/prescription',
    }
  ];

  doctorDashBoard = [
    {
      title: 'Records',
      icon: 'description',
      redirectUrl: '/records',
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
      title: 'Diagnosis',
      icon: 'storage',
      redirectUrl: '/diagnosis',
    },
    {
      title: 'Prescription',
      icon: 'description',
      redirectUrl: '/prescription',
    }
  ];

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    if(this.tokenStorageService.getUser().roles && this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR')){
      this.displayDashboard = this.doctorDashBoard;
    }

    if(this.tokenStorageService.getUser().roles && this.tokenStorageService.getUser().roles.includes('ROLE_HOSPITALSTAFF')){
      this.displayDashboard = this.hospitalStaffDashboard;
    }
  }

  navigate(){
    // this.router.navigate(['/app-appointment'])
  }
}
