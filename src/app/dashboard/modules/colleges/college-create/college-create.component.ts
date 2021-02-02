import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollegeService } from '../colleges.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { College } from '../colleges.model';

@Component({
  selector: 'app-college-create',
  templateUrl: './college-create.component.html',
  styleUrls: ['./college-create.component.css']
})

export class CollegeCreateComponent implements OnInit {
  public submitted: boolean = false;
  public collegeForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    address: ['', [Validators.required]],
    university: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });
  public college: College[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private collegeService: CollegeService
  ) { }

  ngOnInit(): void {
  }

  get myForm(){
    return this.collegeForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.collegeForm.valid){
      return false;
    }else{
      this.collegeService.createCollege(this.collegeForm.value).subscribe(
        (res) => {
          console.log('College create successfully!');
          this.router.navigateByUrl('/colleges');
        }, (error) => {
          console.log(error);
        });
    }
  }

}
