import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-payement-details',
  templateUrl: './payement-details.component.html',
  styleUrls: ['./payement-details.component.css'],
})
export class PayementDetailsComponent implements OnInit {
  patientName = '';
  paymentMethod: string = '';
  disableButton = true;
  email = '';
  amount: any;
  creditCardNumber = '';
  amountToBePaid = 0;
  twoFactorStatus = true;
  paymentCompleted = false;
  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.email = this.tokenStorageService.getUser().email;
    console.log(this.stateService.transactionDetails);
    this.patientName = this.stateService.transactionDetails.payer;
    this.amount = this.stateService.transactionDetails.transactionAmount;
  }

  onSubmit() {
    console.log(this.amountToBePaid);
    if (this.paymentMethod == 'cash') {
      this.onComplete();
    } else if (this.paymentMethod == 'insurance') {
      this.requestToInsurnace();
    }
  }

  auth2fCheck(status: any) {
    this.twoFactorStatus = status;
    console.log(status);
    if (status) {
      this.onComplete();
    }
  }

  handleChange(event: any) {
    if (event.value == 'cash' || event.value == 'insurance') {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
    console.log(event);
  }

  onComplete() {
    const data = this.stateService.transactionDetails;
    let status = data.status;
    // if (remainingAmount == 0) {
    //   status = 'completed_transaction';
    // }
    status = 'completed_transaction';
    this.stateService.updateTransaction(data.transactionID, status).subscribe(
      (res) => {
        this.paymentCompleted = true;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  requestToInsurnace() {
    const status = 'insurance_transaction';
    this.stateService
      .updateTransaction(
        this.stateService.transactionDetails.transactionID,
        status
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.stateService
            .patientInsuranceClaim(
              this.stateService.transactionDetails.transactionID,
              new Date(),
              this.amountToBePaid
            )
            .subscribe(
              (res) => {
                this.paymentCompleted = true;
                console.log(res);
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
