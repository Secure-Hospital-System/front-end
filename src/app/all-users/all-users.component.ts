import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'userId',
    'name',
    'email',
    'accountType',
    'action',
  ];
  // dataSource = ELEMENT_DATA;
  adminData: any;
  id: any;

  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    
    // this.id = this.tokenStorageService.getPatientID();
    this.refresh();
  }

  sortData() {
    this.adminData.sort(function (a: any, b: any) {
      // if (a.userID === b.userID) {
      //   // Price is only important when cities are the same
      //   return a.email - b.email;
      // }
      return a.userID > b.userID ? 1 : -1;
    });
  }

  refresh() {
    // this.adminData = null;
    this.stateService.fetchAllUsers().subscribe(
      res => {
      this.adminData = res;
      console.log(res);
      this.sortData();
    },
    error => {
      console.log(error);
    });
  }

  deleteRow(val: any) {
    this.stateService
      .deleteUser(val.userID)
      .subscribe(
        (response) => {
          this.adminData = this.adminData.filter(
            (obj: any) =>
              obj.userID !== val.userID
          );
          this.sortData();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    console.log(val);
  }
}
