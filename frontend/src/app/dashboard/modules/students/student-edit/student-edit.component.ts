import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  public submitted: boolean = false;
  id: string;
  public studentForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    roll: ['', [Validators.required]],
    branch: ['', [Validators.required]]
  });
  public student: Student[] = [];

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getstudent(this.id)
  }

  get myForm(){
    return this.studentForm.controls;
  }

  getstudent(id){
    this.studentService.getStudentById(id).subscribe(res => {
      // console.log("controller: " ,res);
      this.studentForm.patchValue(res);
    });
  }

  onSubmit(){
    this.submitted = true;
    if(!this.studentForm.valid){
      return false;
    }else{
      if(window.confirm('Are you sure?')){

        let id = this.route.snapshot.paramMap.get('id');
        this.studentService.updateStudent(id, this.studentForm.value)
        .subscribe(res => {
          res => this.studentForm = res
          this.router.navigateByUrl('/students');
          // console.log('Content updated successfully!');
        }, (error) => {
          // console.log(error);
        })
      }
    }
  }

}
