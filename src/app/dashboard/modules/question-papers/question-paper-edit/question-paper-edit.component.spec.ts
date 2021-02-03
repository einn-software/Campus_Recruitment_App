import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPaperEditComponent } from './question-paper-edit.component';

describe('QuestionPaperEditComponent', () => {
  let component: QuestionPaperEditComponent;
  let fixture: ComponentFixture<QuestionPaperEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionPaperEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPaperEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
