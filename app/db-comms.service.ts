import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';

const DBurl: string = 'https://webdev-task-iop-default-rtdb.asia-southeast1.firebasedatabase.app/';

export class PreviousApplications {
  timeApplied: number;
  comment: string;
  applicationAssignedTo: string;
  applicationStatus: string;
  applicationPhase: number;
  formAttached:FillForm;

  constructor (
    timeApplied: number,
    applicationAssignedTo: string,
    applicationStatus: string,
    applicationPhase: number,
    formAttached: FillForm,
    comment: string
  ) {
    this.timeApplied = timeApplied;
    this.applicationAssignedTo = applicationAssignedTo;
    this.applicationStatus = applicationStatus;
    this.applicationPhase = applicationPhase;
    this.formAttached = formAttached;
    this.comment = comment;
  }
}

export class FillForm {
  downloadFields = {
    Aadhaar_Card: false,
    PAN_Card: false,
    Ration_Card : false
  };
  uploadFields = {
    Electricity_Bill: false, 
    Water_Bill: false, 
    Gas_Bill: false, 
    Aadhaar_Card: false, 
    PAN_Card: false, 
    Ration_Card: false
  };
  constructor() {}
}

@Injectable({
  providedIn: 'root'
})
export class DbCommsService {
  previousApplications: PreviousApplications[] = []

  // Code Used for DB data Init
  /*
  initDBData(): void {    
    this.previousApplications.push(new PreviousApplications((new Date().valueOf() - 3000_000) , "Harsh", 'success', 2, new FillForm(),'thank you for using our services'));
    this.previousApplications.push(new PreviousApplications((new Date().valueOf() - 10000_000) , "Harsh", 'failure', 2, new FillForm(), 'not enough documents'));
    this.previousApplications.push(new PreviousApplications((new Date().valueOf() + 7000_000) , "Harsh", 'Pending', 1, new FillForm(), 'please wait...'));
    this.addApplicationsToBack();
  }
  */
  

  sortPrevApps(): void { this.previousApplications.sort((a, b) => {return a.timeApplied - b.timeApplied}); }

  DBurlDataSource(): string {return DBurl + 'Users/' + this.userService.getFolderName() + '/userData.json';}

  constructor(private userService: UserServiceService, private http: HttpClient) { }

  
  fetchPreviousApplicationsFromBack(): PreviousApplications[] {
    this.http.get(
      this.DBurlDataSource(), {
      params: new HttpParams().set('auth', this.userService.getUserToken())
    }).subscribe( (prevApp) => {
      if (prevApp == (null || undefined)) { console.log('No Data') } else { this.convertAnyToPreviousApplications(prevApp) }
    })

    //setTimeout(()=>{console.log(this.previousApplications)}, 2000)


    return this.previousApplications;
  }
  

  convertAnyToPreviousApplications(prevApp: any): PreviousApplications[] {
    this.previousApplications = [];
    for(let key of prevApp) {
      this.previousApplications.push(
        new PreviousApplications(
          key.timeApplied, 
          key.applicationAssignedTo,
          key.applicationStatus,
          key.applicationPhase,
          key.formAttached,
          key.comment
        )
      ) 
    } 
    this.sortPrevApps();
    //console.log(this.previousApplications);
    return this.previousApplications;
  }

  addFormToBack(form: FillForm): void {
    this.formBoilerPlate(form)
    this.addApplicationsToBack();
  }

  formBoilerPlate(form: FillForm):void {
    this.previousApplications.push( new PreviousApplications(new Date().valueOf(), "Harsh", "Pending", 1, form, 
    this.getRandom()
  ));    
  }

  getRandom(): string {
    if(Math.random() > 0.5) {
      return 'not enough documents';
    } else {
      return 'thank you for using our services;'
    }
  }

  addApplicationsToBack():void {
    this.http.put(
      this.DBurlDataSource(), 
      this.previousApplications, {
        params: new HttpParams().set('auth', this.userService.getUserToken())
      }).subscribe( 
        //(prevApp) => {console.log(prevApp)}
    )
  }

  fileHandle(files: FileList): void {
    //Handle files here using Post/Put request
    //Not yet implemented
  }
  /*
  fetchPreviousApplications():void {
    this.http.get(
      this.DBurlDataSource(), {
      params: new HttpParams().set('auth', this.userService.getUserToken())
      }).subscribe(prevApp => {
        if (prevApp == (null || undefined)) { console.log('No Data') } else { this.convertAnyToPreviousApplications(prevApp); }
      }
    )
  }
  */
}
