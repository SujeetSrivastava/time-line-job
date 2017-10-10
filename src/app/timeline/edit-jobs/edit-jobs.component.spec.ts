import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobsComponent } from './edit-jobs.component';

describe('EditJobsComponent', () => {
  let component: EditJobsComponent;
  let fixture: ComponentFixture<EditJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
