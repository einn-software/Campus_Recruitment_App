import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '../../../core/services/api.service';
import { JwtService } from '../../../core/services/jwt.service';
import { Instruction } from './instructions.model';

@Injectable({
  providedIn: 'root'
})

export class InstructionService{

  baseUri: string = 'http://localhost:80';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private apiService: ApiService, private jwtService: JwtService){}

  //Create
  createInstruction(data): Observable<Instruction>{
    console.log(data);
    return this.apiService.post('/instructions', data)
    .pipe(map(
      data => {
        return data;
      })
    );
  }

  //Get all questions
  getInstructions(){
    return this.apiService.get('/instructions');
  }

  //Get question by id
  // getInstruction(id): Observable<Instruction>{
  //   let url = `/questions/${id}`;
  //   return this.apiService.get(url).pipe(
  //     map((res) => {
  //       return res;
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }

  //Update question
  updateInstruction(id, data): Observable<Instruction>{
    let url = `${this.baseUri}/${id}`;
    return this.http.put<Instruction>(url, data, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Delete question
  deleteInstruction(id): Observable<any>{
    let url = `${this.baseUri}/${id}`;
    return this.http.delete(url, { headers: this.headers}).pipe(
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
