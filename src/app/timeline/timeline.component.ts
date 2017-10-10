import { SharedService } from './../shared/shared.service';
import { Job } from './../job.model';

import { Component, OnInit } from '@angular/core';
import { JobService } from './../job.service';
import { AssignedJobList } from './assigned-job/assigned-job.model';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';


import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  assignedJobs: AssignedJobList[];
  totalTimeLineIndex:any;
  subscription: Subscription;
  showEdit: boolean= false;
  selectedJob: Job;
  
  constructor(private jobService: JobService, private sharedService:SharedService) { }

  ngOnInit() {
    this.assignedJobs = this.jobService.getAssignedJobList().sort((a,b)=>{
      if(a.startTime > b.startTime){
        return 1;
      }else{
        return -1
      }
    });

    this.subscription = this.jobService.assignedJobListChanged
    .subscribe(
      (jobs: AssignedJobList[]) => {
        this.assignedJobs = this.jobService.getAssignedJobList().sort((a,b)=>{
          if(a.startTime > b.startTime){
            return 1;
          }else{
            return -1
          }
        });
      }
    );  
    
    this.sharedService.showEdit$.subscribe(
      data => {
          console.log('flag change ' + data);
          this.showEdit = data;
      });

    this.totalTimeLineIndex = new Array(25);
  }

  onEditClick (job:Job){debugger;
    this.showEdit = true;
    this.selectedJob = job;
    this.sharedService.publishData(this.selectedJob);
    this.sharedService.publishEditFlagData(this.showEdit);
    console.log(job);
  }
  onCancelEdit(){
    this.showEdit = false;
    this.sharedService.publishEditFlagData(this.showEdit);
  }

}
