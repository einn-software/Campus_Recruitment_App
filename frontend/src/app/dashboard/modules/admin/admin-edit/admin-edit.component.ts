import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../core/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})

export class AdminEditComponent implements OnInit {
  public submitted: boolean = false;
  public adminForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });
  public admin: User[] = [];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.getAdmin(id);
  }

  get myForm(){
    return this.adminForm.controls;
  }

  getAdmin(id){
    this.adminService.getAdmin(id).subscribe(res => {
      //// console.log("adminres" ,res);
      this.adminForm.patchValue(res);
    });
  }

  onSubmit(){
    this.submitted = true;
    if(!this.adminForm.valid){
      return false;
    }else{
      if(window.confirm('Are you sure?')){
        let id = this.route.snapshot.paramMap.get('id');
        this.adminService.updateAdmin(id, this.adminForm.value)
        .subscribe(res => {
          res => this.adminForm = res
          this.router.navigateByUrl('/admin');
          // console.log('Content updated successfully!');
        }, (error) => {
          // console.log(error);
        })
      }
    }
  }

}
