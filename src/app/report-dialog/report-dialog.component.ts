import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})



export class ReportDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  @Input()
  btnname: string="Create"; 
  data: any;
  ty: any;
  val:any;
  curpos: any;
  sty: any;

  @Output() datachange = new EventEmitter<Object>();

  ngOnInit(): void {
    if (this.btnname=="Create"){
      this.val = "primary"
      this.sty = "{float:'right'}"
    }
    else{
      this.val = "accent"
    }
  }

  onclick(val:any){
    this.data = val
  }

  save(data:any) {
    this.datachange.emit([data,this.ty,this.curpos]);
  }

  openDialog(val:any,act:string): void {
    this.ty = act
    this.curpos = val.position
    const dialogRef = this.dialog.open(ReportDialogComponent3, {
      width: '400px',
      height: '400px',
      panelClass: 'mat-dialog-container',
      data:val,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=="close"){
      this.save(result)
      }
    });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog3',
  templateUrl: './dialog-overview-example-dialog3.html',
  styleUrls:['./dialog-overview-example-dialog3.css']
})


export class ReportDialogComponent3 {
  
  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent3>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  
  public myForm! : FormGroup;
  
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
      Date: new FormControl('', [Validators.required]),
      LabTest: new FormControl('', [Validators.required]),
      });
    this.myForm.setValue({FirstName:this.data.doctor, Date:this.data.date, LabTest:this.data.report})  
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
  date: string;
  doctor: string;
  position: Number;
  report:Number;
}

