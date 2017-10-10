import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedJobComponent } from './assigned-job.component';

describe('AssignedJobComponent', () => {
  let component: AssignedJobComponent;
  let fixture: ComponentFixture<AssignedJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
