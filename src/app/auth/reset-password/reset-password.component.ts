import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../../core/services/forgotpassword.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public submitted: boolean = false;
  public authForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required]]
  });
  public admin: User[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fpService: ForgotPasswordService
  ) {}

  ngOnInit(): void {
  }

  get myForm(){
    return this.authForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.authForm.valid){
      return false;
    }else{
      this.fpService.resetPassword(this.authForm.value).subscribe(
        (res) => {
          console.log('Password reset successfully!');
          this.router.navigateByUrl('/login');
        }, (error) => {
          console.log(error);
        });
    }
  }

}
