import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})

export class AdminCreateComponent implements OnInit {
  public submitted: boolean = false;
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
  ) { }

  ngOnInit(): void {

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
