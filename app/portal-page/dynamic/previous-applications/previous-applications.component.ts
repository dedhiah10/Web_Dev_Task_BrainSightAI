import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DbCommsService, PreviousApplications } from 'src/app/db-comms.service';

@Component({
  selector: 'app-previous-applications',
  templateUrl: './previous-applications.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class PreviousApplicationsComponent implements OnInit, OnDestroy {

  prevApplications: PreviousApplications[] = [];

  constructor(private DBComms: DbCommsService) { }

  ngOnInit(): void {
    this.prevApplications = this.DBComms.previousApplications;
  }

  ngOnDestroy(): void {
    //console.log("history destroyed");
  }

}
