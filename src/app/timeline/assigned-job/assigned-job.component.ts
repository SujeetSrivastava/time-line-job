import { Component, OnInit, Input, enableProdMode } from '@angular/core';
import { Job } from './../../job.model';
import { AssignedJobService } from './assigned.service';
import { AssignedJobList } from './assigned-job.model';

@Component({
  selector: 'app-assigned-job',
  templateUrl: './assigned-job.component.html',
  styleUrls: ['./assigned-job.component.css']
})
export class AssignedJobComponent implements OnInit {
  @Input() job: Job;
  
  showEdit:boolean=false;

  constructor(private assignedJobService : AssignedJobService) { }

  ngOnInit() {
  }

}
