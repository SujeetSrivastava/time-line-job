import { Component, OnInit, Output, Input } from '@angular/core';
import { JobService } from './../job.service';

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css']
})
export class JobBoardComponent implements OnInit {
  constructor(private jobService: JobService) { 
    
  }

  ngOnInit() {
  }

  

}
