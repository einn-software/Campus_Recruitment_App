import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from "../student.model";
import { ApiService } from 'src/app/core';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
cld:[];
  public submitted: boolean = false;
  public studentForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    roll: ['', [Validators.required]],
    branch: ['', [Validators.required]],
    college: ['', [Validators.required]],
    code: ['', [Validators.required]]
  });
  public student: Student[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private apiService: ApiService
  ) {
    this.apiService.get('/colleges').subscribe(data=>{
      console.log(data);
      this.cld = data;
    })
  }

  ngOnInit(): void {
  }

  get myForm(){
    return this.studentForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.studentForm.valid){
      return false;
    }else{
      this.studentService.createStudent(this.studentForm.value).subscribe(
        (res) => {
          console.log('student created successfully!');
          this.router.navigateByUrl('/students');
        }, (error) => {
          console.log(error);
        });
    }
  }

}
