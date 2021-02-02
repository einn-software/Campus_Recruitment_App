import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoDashboardComponent } from './tpo-dashboard.component';

describe('TpoDashboardComponent', () => {
  let component: TpoDashboardComponent;
  let fixture: ComponentFixture<TpoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
