import { Injectable } from "@angular/core";
import { JobList } from './jobList.model';


@Injectable()
export class JobListService{
    private joblist: JobList[] = [
        new JobList("Job1","yellow"),
        new JobList("Job2", "red"),
        new JobList("Job3", "orange"),
        new JobList("Job4", "pink"),
        new JobList("Job5", "lightblue")
    ];

    getJobList(){
        return this.joblist.slice();
    }

    //Add new Job in list
    addNewJob(){
        //TODO
    }

    //Update Job
    updateJob(){
        //TO DO
    }
}