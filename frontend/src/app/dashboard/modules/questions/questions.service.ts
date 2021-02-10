import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '../../../core/services/api.service';
import { Question } from './questions.model';

@Injectable({
  providedIn: 'root'
})

export class QuestionService{
  //baseUri: string = 'http://localhost:80';
  //headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private apiService: ApiService){}

  //Create
  createQuestion(data): Observable<Question>{
    // console.log(data);
    return this.apiService.post('/questions', data)
    .pipe(map(
      data => {
        return data;
      })
    );
  }

  //Get all questions
  getQuestions(): Observable<Question[]>{
    let url = '/questions';
    return this.apiService.get(url).pipe(
      map((res) => {
        return res;
      }),

      catchError(this.errorMgmt)
    )
  }

  //Get question by id
  getQuestion(id): Observable<Question>{
    let url = `/questions/${id}`;
    return this.apiService.get(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Update question
  updateQuestion(id, data): Observable<Question>{
    return this.apiService.put(`/questions/${id}`, data).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Delete question
  deleteQuestion(id): Observable<any>{
    let url = `/questions/${id}`;
    return this.apiService.delete(url).pipe(
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
