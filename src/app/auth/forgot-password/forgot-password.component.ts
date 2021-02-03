import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../../core/services/forgotpassword.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  public submitted: boolean = false;
  public authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]]
  });
  public admin: User[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fpService: ForgotPasswordService
  ) {}

  ngOnInit(): void {}

    get myForm(){
      return this.authForm.controls;
    }

    onSubmit(){
      this.submitted = true;
      if(!this.authForm.valid){
        return false;
      }else{
        this.fpService.forgotPassword(this.authForm.value).subscribe(
          (res) => {
            console.log('Email sent successfully!');
            this.router.navigateByUrl('/login');
          }, (error) => {
            console.log(error);
          });
      }
    }


}
