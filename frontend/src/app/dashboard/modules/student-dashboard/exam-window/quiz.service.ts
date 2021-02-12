import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '../../../../core/services/api.service';
import { AnswerSheet } from './answersheet.model';

@Injectable({
  providedIn: 'root'
})

export class QuizService{

  constructor(
    private apiService: ApiService
  ){}

  //Create Answer Sheet
    createAnswerSheet(data): Observable<AnswerSheet>{
      return this.apiService.post('/student-answers', data)
      .pipe(map(
        data => {
          return data;
        })
      );
    }

    //Get Answer Sheet
    getAnswerSheet(student_id, question_paper_id): Observable<AnswerSheet>{
      return this.apiService.get(`/student-answers/${student_id}/${question_paper_id}`).pipe(
        map((res) => {
          return res;
        }),
        catchError(this.errorMgmt)
      )
    }

    //Update Answer Sheet
    updateAnswerSheet(id, data): Observable<AnswerSheet>{
      return this.apiService.put(`/student-answers/${id}`, data).pipe(
        map((res) => {
          return res;
        }),
        catchError(this.errorMgmt)
      )
    }

     // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }

}
