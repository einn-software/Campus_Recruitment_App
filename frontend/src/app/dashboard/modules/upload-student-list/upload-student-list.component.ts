import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/core';

@Component({
  selector: 'app-upload-student-list',
  templateUrl: './upload-student-list.component.html',
  styleUrls: ['./upload-student-list.component.css']
})
export class UploadStudentListComponent {

    public file : File = null;

    public httpOption = new HttpHeaders({
        'Content-Type': 'application/json',
      });


    constructor(private apiService: ApiService){}

    onFileSelected(event){
    this.file = <File>event.target.files[0];
    // console.log(event);
    }

  onUpload(){
    const fd = new FormData();
    fd.append('file', this.file);
    fd.append('email', window.localStorage['email']);
    // const data ={
    //   'file': fd,
    //   'email': window.localStorage['email']
    // }

    this.apiService.upload('/upload', fd, this.httpOption).subscribe(res=>{
      // console.log(res);
    })
  }

}
