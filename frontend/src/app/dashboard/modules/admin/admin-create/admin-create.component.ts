import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})

export class AdminCreateComponent implements OnInit {
  public submitted: boolean = false;
  data = {
    admins:[{
      name: "",
    email: "",
    password: "",
    phone: ""
    }]
  }
  public adminForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });

  public admin: User[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {
    this.adminForm = this.fb.group({
      admins: this.fb.array([])
    })
    this.setAdmins();
   }
   addAdmins(){
     let control = <FormArray>this.adminForm.controls.admins;
     control.push(
       this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      phone: ['']
     })
     )
   }
   removeAdmins(index){
    let control = <FormArray>this.adminForm.controls.admins;
    control.removeAt(index);
   }
  ngOnInit(): void {

  }
  setAdmins(){
    let control = <FormArray>this.adminForm.controls.admins;
    this.data.admins.forEach(x=>{
      control.push(this.fb.group({
      name: x.name,
      email: x.email,
      password: x.password,
      phone: x.phone
    })
    )})
  }

  get myForm(){
    return this.adminForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.adminForm.valid){
      return false;
    }else{
      this.adminService.createAdmin(this.adminForm.value)
      .subscribe((res) => {
        console.log('Admin created successfully!')
        this.router.navigateByUrl('/admin');
      }, (error) => {
        console.log(error);
      });
    }
  }
}
