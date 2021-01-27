import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '../../../core/services/api.service';
import { JwtService } from '../../../core/services/jwt.service';
import { College } from './colleges.model';

@Injectable({
  providedIn: 'root'
})

export class CollegeService{

  baseUri: string = 'http://localhost:80';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmVkNTAzMDQxYTc2MzI4ZjQ4ZTk1YzkiLCJpYXQiOjE2MTEzMTY3Mzl9.agx7AcgYRPrCjpsW5wBU6vBGO0MijsxByU6E5WE9T4o'  //Pass auth token
    })
  };
  constructor(private http: HttpClient, private apiService: ApiService, private jwtService: JwtService){}

  //Create
  createInstruction(data): Observable<College>{
    console.log(data);
    return this.apiService.post('/instructions', data)
    .pipe(map(
      data => {
        return data;
      })
    );
  }

  //Get all questions
  getColleges(): Observable<College[]>{
    //return this.apiService.get('/instructions');
    return this.http.get<College[]>('http://localhost:80/colleges', this.httpOptions);
  }

  //Get question by id
  getInstruction(id): Observable<College>{
    let url = `/questions/${id}`;
    return this.apiService.get(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Update question
  updateInstruction(id, data): Observable<College>{
    let url = `${this.baseUri}/${id}`;
    return this.http.put<College>(url, data, this.httpOptions).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Delete question
  deleteInstruction(id): Observable<any>{
    let url = `${this.baseUri}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
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
