import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoEditComponent } from './tpo-edit.component';

describe('TpoEditComponent', () => {
  let component: TpoEditComponent;
  let fixture: ComponentFixture<TpoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
