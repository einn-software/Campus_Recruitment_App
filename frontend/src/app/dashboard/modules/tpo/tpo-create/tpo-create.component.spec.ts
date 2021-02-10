import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoCreateComponent } from './tpo-create.component';

describe('TpoCreateComponent', () => {
  let component: TpoCreateComponent;
  let fixture: ComponentFixture<TpoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
