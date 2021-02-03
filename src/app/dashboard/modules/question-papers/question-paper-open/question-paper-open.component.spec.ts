import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPaperOpenComponent } from './question-paper-open.component';

describe('QuestionPaperOpenComponent', () => {
  let component: QuestionPaperOpenComponent;
  let fixture: ComponentFixture<QuestionPaperOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionPaperOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPaperOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
