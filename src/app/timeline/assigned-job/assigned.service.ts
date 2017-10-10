import { Injectable } from "@angular/core";
import { AssignedJobList } from './assigned-job.model';


@Injectable()
export class AssignedJobService{
    
    private assignedJobList: AssignedJobList[] = [
        /* new AssignedJobList("Job1", 0, 3, null, "yellow"),
        new AssignedJobList("Job2", 6, 10, null, "red"),
        new AssignedJobList("Job3", 11, 14, null, "orange"), */
    ];

   getAssignedJobList(){
        return this.assignedJobList.slice();
    }

}