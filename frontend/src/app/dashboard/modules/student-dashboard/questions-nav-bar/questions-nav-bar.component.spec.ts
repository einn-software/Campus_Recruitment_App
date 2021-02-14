import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsNavBarComponent } from './questions-nav-bar.component';

describe('QuestionsNavBarComponent', () => {
  let component: QuestionsNavBarComponent;
  let fixture: ComponentFixture<QuestionsNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
