import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '../../../core/services/api.service';
import { QuestionPaper } from "./question-papers.model";
@Injectable({
  providedIn: 'root'
})
export class QuestionPapersService {

   //baseUri: string = 'http://localhost:80';
  //headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private apiService: ApiService){}

  //Create
  createQuestionPaper(data): Observable<QuestionPaper>{
    console.log(data);
    return this.apiService.post('question-papers', data)
    .pipe(map(
      data => {
        return data;
      })
    );
  }

  //Get all questions
  getQuestionsPaper(): Observable<QuestionPaper[]>{
    let url = '/question-paper';
    return this.apiService.get(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Get question by id
  getQuestionPaper(id): Observable<QuestionPaper>{
    let url = `/question-papers/${id}/questions`;
    return this.apiService.get(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Update question
  updateQuestionPaper(id, data): Observable<QuestionPaper>{
    return this.apiService.put(`/question-papers/${id}`, data).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Delete question
  deleteQuestionPaper(id): Observable<any>{
    let url = `/question-papers/${id}`;
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
