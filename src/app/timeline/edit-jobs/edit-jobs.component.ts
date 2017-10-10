import { SharedService } from './../../shared/shared.service';
import { Job } from './../../job.model';
import { JobList } from './../../jobs/jobList.model';
import { AssignedJobList } from './../assigned-job/assigned-job.model';
import { JobListService } from './../../jobs/jobList.service';
import { JobService } from './../../job.service';

import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
 
@Component({
  selector: 'app-edit-jobs',
  templateUrl: './edit-jobs.component.html',
  styleUrls: ['./edit-jobs.component.css']
})
export class EditJobsComponent implements OnInit {
  @ViewChild('jobIndex') jobIndexRef: ElementRef;
  @ViewChild('hours') hoursRef: ElementRef;
  @ViewChild('minutes') minutesRef: ElementRef;
  @Input() showEdit:boolean = false;
  @Input() job: Job;

  
  jobsAdded = new EventEmitter<Job>()
  assignedJob:any;
  jobsList:JobList[];
  hourCount: number;
  minutesCount: number;
  selectedJob:any;
  activeJobName:string;
  newJob:Job;
  

  constructor(
    private jobService: JobService,
    private joblistService:JobListService,
    private sharedService:SharedService
  ) { 
    this.sharedService.job$.subscribe(
      data => {
          console.log('data from assigned job timeline ' + data);
          this.onEditLoad(data);
          this.selectedJob = data;
          this.activeJobName = data.name;
      });

      this.sharedService.showEdit$.subscribe(
        data => {
            console.log('flag change ' + data);
            this.showEdit = data;
        });
  }

  ngOnInit() {
    this.onEditLoad(this.job);
    this.selectedJob = this.job;
    this.activeJobName = this.job.name;
    this.jobsList = this.joblistService.getJobList();
    
    this.sharedService.showEdit$.subscribe(
      data => {
          console.log('flag change ' + data);
          this.showEdit = data;
      });
  }
  onEditLoad(data:any){
    this.jobService.getAllJobs().forEach(element => {
      if(element.name === data.name){
        this.hourCount = element.startHoursTime;
        this.minutesCount = element.startMinutes;
      }
    });
  }
/*   onSelectedJob(job:any){
    console.log("Hello got clicked", job);
    this.selectedJob = job;
    this.activeJobName = job.name;
  } */
  decreaseOneHour(){
    this.hourCount = this.hourCount > 0 ? this.hourCount - 1 : 0;
    console.log(this.hourCount);
  }
  increaseOneHour(){
    this.hourCount = this.hourCount < 23 ? this.hourCount + 1 : 24;
    console.log(this.hourCount);
  }
  decreaseOneMinute(){
    this.minutesCount = this.minutesCount > 0 ? this.minutesCount - 1 : 0;
    console.log(this.minutesCount);
  }
  increaseOneMinute(){
    this.minutesCount = this.minutesCount < 60 ? this.minutesCount + 1 : 60;
    console.log(this.minutesCount);
  }

  onEditJobs() {
    this.assignedJob = new AssignedJobList(this.selectedJob.name, parseInt(this.hoursRef.nativeElement.innerText), parseInt (this.minutesRef.nativeElement.innerText) , null, this.selectedJob.color );
    this.jobService.editJob(this.selectedJob.name, this.assignedJob);
    this.showEdit = false;
    this.sharedService.publishEditFlagData(this.showEdit);
    console.log("Edit Done");

  }
  onCancelEdit(){
    this.showEdit = false;
    this.sharedService.publishEditFlagData(this.showEdit);
  }

}