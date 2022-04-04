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
      title: 'Appointments',
      icon: 'local_hospital',
      redirectUrl: '/appointments',
    },
    // {
    //   title: 'Records',
    //   icon: 'description',
    //   redirectUrl: '/records',
    // },
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
    // {
    //   title: 'Diagnosis',
    //   icon: 'storage',
    //   redirectUrl: '/diagnosis',
    // },
    // {
    //   title: 'Prescription',
    //   icon: 'description',
    //   redirectUrl: '/prescription',
    // }
  ];


  labStaffDashBoard = [
    {
      title: 'Lab Requests',
      icon: '',
      redirectUrl: '/lab-request',
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
    }

  ];

  insuranceStaffDashBoard = [
    {
      title: 'InsuranceStaff',
      icon: 'person_outline',
      redirectUrl: '/insurancestaff'
    }
  ];

  adminStaffDashboard = [
    
    {
      title: 'Registration',
      icon: 'person',
      redirectUrl: '/admin-registration'
    },
    {
      title: 'Profiles',
      icon: 'person',
      redirectUrl: '/all-users',
    },
    {
      title: 'Pending Transactions',
      icon: 'payment',
      redirectUrl: '/payment',
    },
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
      title: 'Diagnosis',
      icon: 'storage',
      redirectUrl: '/diagnosis',
    },
    {
      title: 'Prescription',
      icon: 'description',
      redirectUrl: '/prescription',
    }
  ]


  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    if(this.tokenStorageService.getUser().roles && this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR')){
      this.displayDashboard = this.doctorDashBoard;
    }

    if(this.tokenStorageService.getUser().roles && this.tokenStorageService.getUser().roles.includes('ROLE_HOSPITALSTAFF')){
      this.displayDashboard = this.hospitalStaffDashboard;
    }

    if(this.tokenStorageService.getUser().roles && this.tokenStorageService.getUser().roles.includes('ROLE_LABSTAFF')){
      this.displayDashboard = this.labStaffDashBoard;
    }

    if(this.tokenStorageService.getUser().roles && this.tokenStorageService.getUser().roles.includes('ROLE_INSURANCESTAFF')){
      this.displayDashboard = this.insuranceStaffDashBoard;
    }

    if(this.tokenStorageService.getUser().roles && this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN')){
      this.displayDashboard = this.adminStaffDashboard;
    }
  }

  navigate(){
    // this.router.navigate(['/app-appointment'])
  }
}
