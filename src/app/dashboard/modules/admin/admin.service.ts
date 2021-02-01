import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '../../../core/services/api.service';
import { User } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AdminService{
  //baseUri: string = 'http://localhost:80';
  //headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private apiService: ApiService){}

  //Create
  createAdmin(data): Observable<User>{
    console.log(data);
    return this.apiService.post('/admins', data)
    .pipe(map(
      data => {
        return data;
      })
    );
  }

  //Get all questions
  getAdmins(): Observable<User[]>{
    let url = '/admins';
    return this.apiService.get(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Get question by id
  getAdmin(id): Observable<User>{
    let url = `/admins/${id}`;
    return this.apiService.get(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Update question
  updateAdmin(id, data): Observable<User>{
    return this.apiService.put(`/admins/${id}`, data).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Delete question
  deleteAdmin(id): Observable<any>{
    let url = `/admins/${id}`;
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
