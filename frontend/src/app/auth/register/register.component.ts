import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Student } from 'src/app/dashboard/modules/students/student.model';
import { Errors, UserService, ApiService } from '../../core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  authType: string = '';
  role: string = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  clg : [];
  data={
    students: [{
      name: "",
      email: "",
      phone: "",
      password: "",
      roll: "",
      branch: "",
      college: "",
      code: ""
    }]
  }
  public student: Student[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private userService: UserService,
    private fb: FormBuilder
    ) {
      this.route.url.subscribe(data => {
        // Get the last piece of the URL (it's either 'login' or 'register')
        this.role = data[data.length - 1].path;
        this.authType = this.route.pathFromRoot[this.route.pathFromRoot.length - 2].routeConfig.path;
        // Set a title for the page accordingly
        this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      });
      this.authForm = this.fb.group({
        students: this.fb.array([this.fb.group({
              'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
              'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(7), Validators.maxLength(255)]),
              'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
              'phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(14)]),
              'roll': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
              'branch': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(55)]),
              'college': new FormControl(null, Validators.required),
            'code': new FormControl(null, Validators.required),
            })
          ])
      })
      // this.setStudents();
    // use FormBuilder to create a form group
    // switch(this.role){
    //   case 'admins': this.authForm = this.fb.group({
    //     'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    //     'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(7), Validators.maxLength(255)]),
    //     'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
    //     'phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(14)]),
    //   });
    //   break;
    // case 'colleges' :
    //   this.authForm = this.fb.group({
    //     'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    //     'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(7), Validators.maxLength(255)]),
    //     'phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(14)]),
    //     'university': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
    //     'address': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(1024)])
    //   });
    //   break;
    // case 'tpos' :
    //     this.authForm = this.fb.group({
    //       'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    //       'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(7), Validators.maxLength(255)]),
    //       'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
    //       'phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(14)]),
    //       'designation': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    //       'college': new FormControl(null, Validators.required),
    //       'code': new FormControl(null, Validators.required),
    //     });
    //     break;
    //  default:
    //   this.authForm = this.fb.group({
    //     'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    //     'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(7), Validators.maxLength(255)]),
    //     'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
    //     'phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(14)]),
    //     'roll': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
    //     'branch': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(55)]),
    //     'college': new FormControl(null, Validators.required),
    //   'code': new FormControl(null, Validators.required),
    //   });
    //       }
          // console.log(this.authForm);
  }
  setStudents(){
    let control = <FormArray>this.authForm.controls.students;
     this.data.students.forEach(x => {
      control.push(this.fb.group({
        name: x.name,
    email: x.email,
    phone: x.phone,
    password: x.password,
    roll: x.roll,
    branch: x.branch,
    college: x.college,
    code: x.code
      })
     )});
  }
  ngOnInit(): void {
    this.apiService.get('/colleges').subscribe(data=>{
      // console.log(data);
      this.clg = data;
    })
  }

  get myForm(){
    return this.authForm.controls;
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

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
