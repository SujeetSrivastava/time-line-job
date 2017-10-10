import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';

import { JobService } from './../../job.service';
import { JobListService } from './../jobList.service';

import { Job } from './../../job.model';
import { JobList } from './../jobList.model';
import { AssignedJobList } from './../../timeline/assigned-job/assigned-job.model';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  @ViewChild('jobIndex') jobIndexRef: ElementRef;
  @ViewChild('hours') hoursRef: ElementRef;
  @ViewChild('minutes') minutesRef: ElementRef;
  private showAdd:boolean = false;

  jobsAdded = new EventEmitter<Job>()
  assignedJob:any;
  jobsList:JobList[];
  hourCount: number;
  minutesCount: number;
  selectedJob:any;
  newJob:Job;
  activeJobName:string;

  constructor(
    private jobService: JobService,
    private joblistService:JobListService
  ) { }

  ngOnInit() {
    this.hourCount = 0;
    this.minutesCount = 0;
    this.jobsList = this.joblistService.getJobList();
  }

  onSelectedJob(job:any){
    console.log("Hello got clicked", job);
    this.selectedJob = job;
    this.activeJobName = job.name;
  }
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

  onAddJobs() {
    debugger;
    this.assignedJob = new AssignedJobList(this.selectedJob.name, parseInt(this.hoursRef.nativeElement.innerText), parseInt (this.minutesRef.nativeElement.innerText) , null, this.selectedJob.color );
    this.jobService.addJob(this.assignedJob);
    this.showAdd = false;
    console.log("Hello");

  }
  onCancel(){
    this.showAdd = false;
  }

  onAddNewJob(){
    this.showAdd=true;
  }
}
