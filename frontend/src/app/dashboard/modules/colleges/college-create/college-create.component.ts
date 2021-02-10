import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollegeService } from '../colleges.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { College } from '../colleges.model';

@Component({
  selector: 'app-college-create',
  templateUrl: './college-create.component.html',
  styleUrls: ['./college-create.component.css']
})

export class CollegeCreateComponent implements OnInit {
  public submitted: boolean = false;
  data = {
    colleges: [{
      name: "",
    address: "",
    university: "",
    email: "",
    phone: ""
    }]
  }
  public collegeForm: FormGroup;
  public college: College[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private collegeService: CollegeService
  ) {
    this.collegeForm = this.fb.group({
      colleges: this.fb.array([])
    })
    this.setCollege();
   }
   setCollege(){
     let control = <FormArray>this.collegeForm.controls.colleges;
     this.data.colleges.forEach(x => {
      control.push(this.fb.group({
        name: x.name,
    address: x.address,
    university: x.university,
    email: x.email,
    phone: x.phone
      })
     )});
   }
   AddColleges(){
    let control = <FormArray>this.collegeForm.controls.colleges;
    control.push(this.fb.group({
          name: [''],
    address: [''],
    university: [''],
    email: [''],
    phone: ['']
    }))
   }
   removeColleges(index){
    let arr = <FormArray>this.collegeForm.controls.colleges;
    arr.removeAt(index);
   }
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
          // console.log('College create successfully!');
          this.router.navigateByUrl('/colleges');
        }, (error) => {
          // console.log(error);
        });
    }
  }

}
