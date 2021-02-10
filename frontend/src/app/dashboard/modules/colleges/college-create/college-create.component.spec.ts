import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeCreateComponent } from './college-create.component';

describe('CollegeCreateComponent', () => {
  let component: CollegeCreateComponent;
  let fixture: ComponentFixture<CollegeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
