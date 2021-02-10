import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStudentListComponent } from './upload-student-list.component';

describe('UploadStudentListComponent', () => {
  let component: UploadStudentListComponent;
  let fixture: ComponentFixture<UploadStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadStudentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
