import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recorddialog',
  templateUrl: './recorddialog.component.html',
  styleUrls: ['./recorddialog.component.css']
})
export class RecorddialogComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  @Input()
  btnname: string="Create";
  data: any;
  val: any;
  type: any;
  length!: number;

  @Output() datachange = new EventEmitter<Object>();

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
    console.log(val,act)
    this.type = act
    this.length = val.Nos
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
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
  selector: 'dialog-overview-example-dialog2',
  templateUrl: './dialog-overview-example-dialog2.html',
  styleUrls:['./dialog-overview-example-dialog2.css']
})


export class DialogOverviewExampleDialog2 {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  public myForm!: FormGroup;

  @Output() datachange = new EventEmitter<Object>();

  ngOnInit(): void {
    //Creating the myForm Data and validating each input field.
    this.myForm = new FormGroup({
      Record: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Date: new FormControl('', [Validators.required]),
      });
      console.log(this.data)
      this.myForm.setValue({Record:this.data.Record, Date:this.data.Date})
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
  Record: string;
  Date: string;
}
