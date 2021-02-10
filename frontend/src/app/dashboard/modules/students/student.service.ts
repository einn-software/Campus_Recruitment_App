import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { Student } from "./student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private apiService: ApiService){}

  //Create
  createStudent(data): Observable<Student>{
    // console.log(data);
    return this.apiService.post('/register/students', data)
    .pipe(map(
      data => {
        return data;
      })
    );
  }

  //Get student by id
  getStudentById(id): Observable<Student>{
    return this.apiService.get(`/students/${id}`).pipe(
      map((res) => {
        // console.log("Student: ",res);

        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Get student by code
  getStudent(code): Observable<Student[]>{
    return this.apiService.get(`/colleges/${code}/students`).pipe(
      map((res) => {
        // console.log("Student: ",res);
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Update student
  updateStudent(id, data): Observable<Student>{
    return this.apiService.put(`/Students/${id}`, data).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  //Delete student
  deleteStudent(id): Observable<any>{
    let url = `/Students/${id}`;
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
