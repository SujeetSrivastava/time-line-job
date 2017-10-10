import { Job } from './../job.model';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class SharedService {
    // Observable string sources
    private job = new Subject<Job>(); 
    private showEdit = new Subject<boolean>();

    // Observable string streams
    job$ = this.job.asObservable();

    showEdit$ = this.showEdit.asObservable();

    // Service message commands
    publishData(data: Job) {
        this.job.next(data);
    }
    publishEditFlagData(showEdit: boolean) {
        this.showEdit.next(showEdit);
    }
}