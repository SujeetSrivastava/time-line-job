import { SharedService } from './shared/shared.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import { TimelineComponent } from './timeline/timeline.component';
import { JobComponent } from './jobs/job/job.component';
import { EditJobsComponent } from './timeline/edit-jobs/edit-jobs.component';
import { AssignedJobComponent } from './timeline/assigned-job/assigned-job.component';
import { JobBoardComponent } from './job-board/job-board.component';
import { Job } from './job.model';
import { JobList } from './jobs/jobList.model';
import { JobService } from './job.service';
import { JobListService } from './jobs/jobList.service';
import { AssignedJobService } from './timeline/assigned-job/assigned.service';
import { AssignedJobList } from './timeline/assigned-job/assigned-job.model';



//'./jobs/edit-jobs/edit-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    TimelineComponent,
    JobComponent,
    EditJobsComponent,
    AssignedJobComponent,
    JobBoardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    JobService,
    JobListService,
    AssignedJobService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
