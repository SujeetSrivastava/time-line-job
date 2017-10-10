import { Injectable } from "@angular/core";
import { element } from 'protractor';

import { AssignedJobList } from './timeline/assigned-job/assigned-job.model';
import { Job } from './job.model';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class JobService{
    private jobs: Job[] =[];
    private assignedJobList: AssignedJobList[] = [];

    private showAdd: boolean = false;
    
    assignedJobListChanged = new Subject<AssignedJobList[]>();

    getAssignedJobList(){
        let jobList = []; 
        jobList = this.arrangeJobList( this.assignedJobList.slice().sort((a,b)=>{
            if((a.startHoursTime*60+a.startMinutes) > (b.startHoursTime*60+b.startMinutes)){
              return 1;
            }else{
              return -1
            }
          }));
        return jobList;
    }

    getAllJobs(){
        return this.assignedJobList.slice();
    }
    
    arrangeJobList(objAssignedJobs): any{
        
        //Clear Job list first then rearrange
        this.jobs.splice(0,this.jobs.length);
        
        let tempJob = {
            name: "",
            startTime: 0,
            endTime: 0,
            color: "",
            minutesAllocated: 0,
            minuteGap: 0,
            minuteGapBefore: 0
          };

        if(objAssignedJobs.length == 1){
            //If Only one node
            tempJob.name = objAssignedJobs[0].name;
            tempJob.color = objAssignedJobs[0].color;
            tempJob.startTime = (objAssignedJobs[0].startHoursTime * 60 + objAssignedJobs[0].startMinutes);
            tempJob.endTime = objAssignedJobs[0].endTime === null ? 1440 : parseInt(objAssignedJobs[0].endTime)*60;
            tempJob.minutesAllocated = (tempJob.endTime -tempJob.startTime);
            tempJob.minuteGap = (1440 - tempJob.endTime);
            tempJob.minuteGapBefore = tempJob.startTime;
            this.jobs.push(new Job(tempJob.name, tempJob.startTime, tempJob.endTime, tempJob.minuteGap, tempJob.color, tempJob.minutesAllocated, tempJob.minuteGapBefore));
        
        }else if(objAssignedJobs.length > 1){
            //If More than one node Job
            //Before Last Node

            for(let currentNodeIndex = 0, nextNodeIndex = 1; currentNodeIndex < objAssignedJobs.length; currentNodeIndex++, nextNodeIndex++){
                if(nextNodeIndex < objAssignedJobs.length){
                tempJob.name = objAssignedJobs[currentNodeIndex].name;
                tempJob.color = objAssignedJobs[currentNodeIndex].color;
                tempJob.startTime = (objAssignedJobs[currentNodeIndex].startHoursTime * 60 + objAssignedJobs[currentNodeIndex].startMinutes);
                if(objAssignedJobs[currentNodeIndex].endTime === null){
                    tempJob.endTime = (objAssignedJobs[nextNodeIndex].startHoursTime * 60 + objAssignedJobs[nextNodeIndex].startMinutes);
                    tempJob.minutesAllocated = (tempJob.endTime - tempJob.startTime);
                    tempJob.minuteGap = 0;
                }else{
                    tempJob.endTime = parseInt(objAssignedJobs[currentNodeIndex].endTime)*60;
                    tempJob.minutesAllocated = (tempJob.endTime - tempJob.startTime);
                    tempJob.minuteGap = ((objAssignedJobs[nextNodeIndex].startHoursTime * 60 + objAssignedJobs[nextNodeIndex].startMinutes) -  tempJob.endTime);
                }
                }else{
                    //Last Node
                    tempJob.name = objAssignedJobs[currentNodeIndex].name;
                    tempJob.color = objAssignedJobs[currentNodeIndex].color;
                    tempJob.startTime = (objAssignedJobs[currentNodeIndex].startHoursTime * 60 + objAssignedJobs[currentNodeIndex].startMinutes);
                    if(objAssignedJobs[currentNodeIndex].endTime === null){
                        tempJob.endTime = 1440;
                        tempJob.minutesAllocated = (tempJob.endTime - tempJob.startTime);
                        tempJob.minuteGap = 0;
                    }else{
                        tempJob.endTime = parseInt(objAssignedJobs[currentNodeIndex].endTime)*60;
                        tempJob.minutesAllocated = (tempJob.endTime - tempJob.startTime);
                        tempJob.minuteGap = ((objAssignedJobs[currentNodeIndex].startHoursTime * 60 + objAssignedJobs[currentNodeIndex].startMinutes) -  tempJob.endTime);
                    }
                } 
                if(currentNodeIndex == 0){
                    tempJob.minuteGapBefore = tempJob.startTime;
                }else{
                    tempJob.minuteGapBefore = 0;
                }
                this.jobs.push(new Job(tempJob.name, tempJob.startTime, tempJob.endTime, tempJob.minuteGap, tempJob.color, tempJob.minutesAllocated, tempJob.minuteGapBefore));
            }
        }

        return this.jobs;
    }

    addJob(assignedJob:AssignedJobList){
        let checkExist = false;
        
        this.assignedJobList.forEach(element => {
            if (element.name === assignedJob.name || (element.startHoursTime === assignedJob.startHoursTime && element.startMinutes === assignedJob.startMinutes)){
                checkExist = true
            }
        });

        if(!checkExist){
            this.assignedJobList.push(assignedJob);
            this.assignedJobListChanged.next(this.assignedJobList.slice());
        }
    }

    editJob(jobName: string, newJob:AssignedJobList){
        for(let index = 0; index < this.assignedJobList.length; index++ ){
            if(this.assignedJobList[index].name === jobName){
                this.assignedJobList[index].color = newJob.color;
                this.assignedJobList[index].startHoursTime = newJob.startHoursTime;
                this.assignedJobList[index].startMinutes = newJob.startMinutes;
            }
        }
        this.assignedJobListChanged.next(this.assignedJobList.slice());
    }

    showHideAddJob(){
        this.showAdd = this.showAdd ? false : true;
    }
}