import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '../../../core/services/api.service';
import { College } from './colleges.model';

@Injectable({
  providedIn: 'root'
})

export class CollegeService{

  // baseUri: string = 'http://localhost:80';
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmVkNTAzMDQxYTc2MzI4ZjQ4ZTk1YzkiLCJpYXQiOjE2MTEzMTY3Mzl9.agx7AcgYRPrCjpsW5wBU6vBGO0MijsxByU6E5WE9T4o'  //Pass auth token
  //   })
  // };

  constructor(private http: HttpClient, private apiService: ApiService){}

  //Create
  createCollege(data): Observable<College>{
    console.log(data);
    return this.apiService.post('/colleges', data)
    .pipe(map(
      data => {
        return data;
      })
    );
  }

  //Get all questions
  getColleges(): Observable<College[]>{
    return this.apiService.get('/colleges');
  }

  //Get instruction by id
  getCollege(code): Observable<College>{
    return this.apiService.get(`/colleges/${code}`).pipe(
      map((res) => {
        console.log("college: ",res);

        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Update instruction
  updateCollege(code, data): Observable<College>{
    return this.apiService.put(`/colleges/${code}`, data).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Delete question
  deleteCollege(id): Observable<any>{
    let url = `/colleges/${id}`;
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
