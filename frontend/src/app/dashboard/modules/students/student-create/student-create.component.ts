import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  data={
    students: [{
      name: "",
      email: "",
      phone: "",
      password: "",
      roll: "",
      branch: "",
      college: "",
      code: ""
    }]
  }
  public studentForm: FormGroup;
  public student: Student[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private apiService: ApiService
  ) {
    this.studentForm = this.fb.group({
      students: this.fb.array([])
    })
    this.setStudents();
  }
  setStudents(){
    let control = <FormArray>this.studentForm.controls.students;
     this.data.students.forEach(x => {
      control.push(this.fb.group({
        name: x.name,
    email: x.email,
    phone: x.phone,
    password: x.password,
    roll: x.roll,
    branch: x.branch,
    college: x.college,
    code: x.code
      })
     )});
  }
  AddStudents(){
    let control = <FormArray>this.studentForm.controls.students;
    control.push(this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      password: [''],
      roll: [''],
      branch: [''],
      college: [''],
      code: ['']
    }))
   }
   removeStudents(index){
    let arr = <FormArray>this.studentForm.controls.students;
    arr.removeAt(index);
   }
  ngOnInit(): void {
    this.apiService.get('/colleges').subscribe(data=>{
      console.log(data);
      this.cld = data;
    })
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
