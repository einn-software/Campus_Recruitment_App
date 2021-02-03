import { TestBed } from '@angular/core/testing';

import { QuestionPapersService } from './question-papers.service';

describe('QuestionPapersService', () => {
  let service: QuestionPapersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionPapersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
