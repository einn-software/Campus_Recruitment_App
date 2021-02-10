import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService, Errors, UserService } from '../../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role: string = '';
  authType: string = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  clg: [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.role = data[data.length - 1].path;
      this.authType = this.route.pathFromRoot[this.route.pathFromRoot.length - 2].routeConfig.path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    });
    if(this.role == 'students'){
      this.authForm = this.fb.group({
      'code': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      'roll': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      });
      }
      else{
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(7), Validators.maxLength(255)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
    });
  }
   }

  ngOnInit(): void {
    this.apiService.get('/colleges')
    .subscribe(
      data => {
        this.clg = data;
      }
    );
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    console.log(this.role);
    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, this.role, credentials)
    .subscribe(
      data => this.router.navigateByUrl(`/dash/${this.role}`),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
