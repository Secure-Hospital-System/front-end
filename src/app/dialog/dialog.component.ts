import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  @Input()
  btnname: string="Create";
  data: any;
  val: any;
  type: any;
  length!: number;

  @Output() datachange = new EventEmitter<Object>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.btnname=="add_circle"){
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
    this.datachange.emit([data,this.type,this.length]);
  }

  openDialog(val:any,act:any): void {
    console.log(val)
    this.type = act
    this.length = val.Nos
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

  @Output() datachange = new EventEmitter<Object>();

  ngOnInit(): void {
    //Creating the myForm Data and validating each input field.
    this.myForm = new FormGroup({
      Diagnosis: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Date: new FormControl('', [Validators.required]),
      LabTest: new FormControl('',[Validators.required])
      });
    this.myForm.setValue({Diagnosis:this.data.Diagnosis, Date:this.data.Date, LabTest:this.data.LabTest})
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
  Diagnosis: string;
  Date: string;
  LabTest: string
}

