import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  role: string;
  public authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  public admin: User[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fpService: ForgotPasswordService
  ) {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.role = data[data.length - 1].path;
    });
  }

  ngOnInit(): void {}

    get myForm(){
      return this.authForm.controls;
    }

    onSubmit(){
      this.submitted = true;
      if(!this.authForm.valid){
        return false;
      }else{
        this.fpService.forgotPassword(this.authForm.value, this.role).subscribe(
          (res) => {
            // console.log('Email sent successfully!');
            this.router.navigateByUrl(`/login/${this.role}`);
          }, (error) => {
            // console.log(error);
          });
      }
    }


}
