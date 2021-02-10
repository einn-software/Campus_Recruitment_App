import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '../../../core/services/api.service';
import { Tpo } from './tpo.model';

@Injectable({
  providedIn: 'root'
})

export class TpoService{
  constructor(private http: HttpClient, private apiService: ApiService){}

  //Create TPO
  createTPO(data): Observable<Tpo>{
    // console.log(data);
    return this.apiService.post('/register/tpos', data)
    .pipe(map(
      data => {
        return data;
      })
    );
  }

  //Get all tpos
  getTPOs(): Observable<Tpo[]>{
    return this.apiService.get('/tpos').pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Get tpo by id
  getTpo(id): Observable<Tpo>{
    return this.apiService.get(`/tpos/${id}`).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Update TPO
  updateTPO(id, data): Observable<Tpo>{
    return this.apiService.put(`/tpos/${id}`, data).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Delete TPO
  deleteTPO(id): Observable<any>{
    return this.apiService.delete(`/tpos/${id}`).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Error handling
  errorMgmt(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //Get client-side error
      errorMessage = error.error.message;
    }else{
      //Get server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }


}
