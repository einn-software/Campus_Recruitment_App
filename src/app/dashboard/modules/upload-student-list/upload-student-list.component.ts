import { Component } from '@angular/core';
import { ApiService } from 'src/app/core';

@Component({
  selector: 'app-upload-student-list',
  templateUrl: './upload-student-list.component.html',
  styleUrls: ['./upload-student-list.component.css']
})
export class UploadStudentListComponent {
public file : File = null;
constructor(private apiService: ApiService){
}
  onFileSelected(event){
    this.file = <File>event.target.files[0];
    console.log(event);
  }
  onUpload(){
    const fd = new FormData();
    fd.append('xlsx', this.file, this.file.name);
    const data ={
      'file': fd,
      'email': window.localStorage['email']
    }
    this.apiService.post('/upload', fd).subscribe(res=>{
      console.log(res);
    })
  }

}
