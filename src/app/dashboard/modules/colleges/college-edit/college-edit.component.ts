import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { College } from '../colleges.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollegeService } from '../colleges.service';


@Component({
  selector: 'app-college-edit',
  templateUrl: './college-edit.component.html',
  styleUrls: ['./college-edit.component.css']
})

export class CollegeEditComponent implements OnInit {
  public submitted: boolean = false;
  public collegeForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    address: ['', [Validators.required]],
    university: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });
  public college: College[] = [];

  constructor(
    private collegeService: CollegeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    var code = this.route.snapshot.paramMap.get('code');
    this.getCollege(code);
  }

  get myForm(){
    return this.collegeForm.controls;
  }

  getCollege(code){
    this.collegeService.getCollege(code).subscribe(res => {
      console.log("controller: " ,res);
      this.collegeForm.patchValue(res);
    });
  }

  onSubmit(){
    this.submitted = true;
    if(!this.collegeForm.valid){
      return false;
    }else{
      if(window.confirm('Are you sure?')){
        let id = this.route.snapshot.paramMap.get('id');
        this.collegeService.updateCollege(id, this.collegeForm.value)
        .subscribe(res => {
          res => this.collegeForm = res
          this.router.navigateByUrl('/colleges');
          console.log('Content updated successfully!');
        }, (error) => {
          console.log(error);
        })
      }
    }
  }


}
