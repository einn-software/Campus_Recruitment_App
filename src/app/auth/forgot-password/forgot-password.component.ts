import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../../core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  authType: string = '';
  role: string = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      //this.authType = data[data.length - 1].path;
      this.role = data[data.length - 1].path;
      this.authType = this.route.pathFromRoot[this.route.pathFromRoot.length - 2].routeConfig.path;
      // Set a title for the page accordingly
      //this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      // if (this.authType === 'register') {
      //   this.authForm.addControl('username', new FormControl());
      // }
    });
  }

   submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    console.log(this.role);
    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, this.role, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
