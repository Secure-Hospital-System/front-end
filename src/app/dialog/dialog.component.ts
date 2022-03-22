import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {


  @Input()
  btnname: string="Create";
  data: any;
  val: any;
  type: any;

  @Output() datachange = new EventEmitter<Object>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.btnname=="Create"){
      this.val="accent"
    }
    else{
      this.val="primary"
    }
  }

  onclick(val:any){
    this.data = val
  }

  save(data:any) {
    this.datachange.emit([data,this.type]);
  }

  openDialog(val:any,act:any): void {
    this.type = act
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      height: '400px',
      panelClass: 'mat-dialog-container',
      data:val,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result!=="close"){
      this.save(result)
      }
    });
  }


}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls:['./dialog-overview-example-dialog.css']
})


export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  public myForm!: FormGroup;

  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado'
  ];

  @Output() datachange = new EventEmitter<Object>();

  ngOnInit(): void {
    //Creating the myForm Data and validating each input field.
    this.myForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z \-\']+')]),
      Diagnosis: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Date: new FormControl('', [Validators.required]),
      });
    this.myForm.setValue({FirstName:this.data.name,Diagnosis:this.data.weight,Date:this.data.position})
  }

  onNoClick(): void {
    this.dialogRef.close("close");
  }

  //Error Function for alerting error on incorrect input in the form
  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
  }

  //Save function executed after submitting the patient input data.
  save(data:any) {
    this.dialogRef.close(data);
  }

  //Edit function executed for editing the patient input data.
  edit(){
    this.myForm.enable()
  }
}

export interface DialogData {
  name: string;
  weight: string;
  position: string;
}

