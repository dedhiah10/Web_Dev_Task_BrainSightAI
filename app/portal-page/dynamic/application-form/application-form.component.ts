import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { DbCommsService, FillForm } from 'src/app/db-comms.service';

@Component({
  selector: 'application-form',
  templateUrl: './application-form.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class ApplicationFormComponent implements OnInit, OnDestroy {  
  //OLD_Form
  //uploadFormFields:string[] = ["Electricity Bill", "Water Bill", "Gas Bill", "Aadhaar Card", "PAN Card", "Ration Card"];
  //downloadFormFields:string[] = ["Aadhaar Card", "PAN Card", "Ration Card"];

  subs: Subscription[] = [];

  formAccept: boolean = false;
  filesAdded = false;
  formReady: boolean = false;

  fillForm:FillForm = new FillForm();

  confirmedForm: FillForm | null = null;
  upForm: FormGroup;
  downloadFields: FormGroup;
  uploadFields: FormGroup;

  fileToUpload: FileList|null = null;

  constructor(
    private fbs: FormBuilder, 
    private DBComms: DbCommsService,
    private router: Router
  ) { 
    this.downloadFields = this.fbs.group(this.fillForm.downloadFields);
    this.uploadFields = this.fbs.group(this.fillForm.uploadFields);

    this.upForm = this.fbs.group({
      uploadFields: this.uploadFields,
      downloadFields: this.downloadFields
    });

    this.subs[0] = this.upForm.valueChanges.subscribe(() => {this.formValidator();})
    this.subs[1] = interval(200).subscribe(() => {this.formValidator();}) 
  }

  logger():void {console.log(this.upForm.value, this.formAccept)}

  //checks if form is valid every 200ms or subscription
  formValidator(): void {
    if(this.formAccept && this.filesAdded) {
      let upFieldsValid = false;
      let downloadFieldsValid = false

      const d = this.upForm.value.downloadFields;
      const u = this.upForm.value.uploadFields;
      
      if(
        d.Aadhaar_Card ||
        d.PAN_Card||
        d.Ration_Card
      ) {downloadFieldsValid = true;}

      if(
        u.Aadhaar_Card ||
        u.Electricity_Bill ||
        u.Gas_Bill ||
        u.PAN_Card ||
        u.Ration_Card ||
        u.Water_Bill
      ) {upFieldsValid = true;}

      if( upFieldsValid && downloadFieldsValid ) 
      {this.formReady = true;} 
      else {this.formReady = false;}

    } else {this.formReady = false;}
  }

  ngOnInit(): void {  }

  /*
  fileListChecker() { 
    if (this.fileToUpload != null) {
      let numarr = []
      for (let x of this.fileToUpload) { 
        let a = this.fileToUpload[x].type;
        if (a.includes('zip') || a.includes('png') || a.includes('jpg'))) {}
        else {numarr.push(x)}
      }
      while(numarr != []) {this.fileToUpload}
    }
  }
  */

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files;
    console.log(event.target.files)

    if(this.fileToUpload != null && this.fileToUpload?.length != 0) {
      //implement file checking
      //this.fileListChecker();
      this.filesAdded = true;
    }
  }

  formSubmit() {
    if(this.formReady) {
    this.confirmedForm = JSON.parse(JSON.stringify(this.upForm.value));

    if( this.confirmedForm != ( null || undefined ) ) 
    { this.DBComms.addFormToBack(this.confirmedForm); }

    //logic for handling files
    if(this.fileToUpload != null)
    { this.DBComms.fileHandle(this.fileToUpload);}
    

    this.upForm.reset();

    this.router.navigate(['history']);
    }
  }

  ngOnDestroy(): void {
    this.subs[0].unsubscribe();
    this.subs[1].unsubscribe();
    //console.log("form destroyed");
  }

}
