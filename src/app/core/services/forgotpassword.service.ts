import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from './api.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class ForgotPasswordService{
  constructor(private http: HttpClient, private apiService: ApiService){}

  //Forgot Password - Enter an email address
  forgotPassword(data): Observable<User>{
    console.log(data);
    return this.apiService.post('/forgot-password/admins', data)
    .pipe(map(
      data => {
        return data;
      })
    );
  }

  resetPassword(data): Observable<User>{
    console.log(data);
    return this.apiService.post('/reset-password/admins', data)
    .pipe(map(
      data => {
        return data;
      })
    );
  }


}
