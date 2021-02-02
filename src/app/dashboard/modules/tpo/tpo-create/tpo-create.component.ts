import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TpoService } from '../tpo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tpo } from '../tpo.model';

@Component({
  selector: 'app-tpo-create',
  templateUrl: './tpo-create.component.html',
  styleUrls: ['./tpo-create.component.css']
})

export class TpoCreateComponent implements OnInit {
  public submitted: boolean = false;
  public tpoForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    college: ['', [Validators.required]],
    code: ['', [Validators.required]]
  })

  public tpo: Tpo[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tpoService: TpoService
  ) { }

  ngOnInit(): void {
  }

  get myForm(){
    return this.tpoForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.tpoForm.valid){
      return false;
    }else{
      this.tpoService.createTPO(this.tpoForm.value)
      .subscribe((res) => {
        console.log('TPO created successfully!')
        this.router.navigateByUrl('/tpo');
      }, (error) => {
        console.log(error);
      });
    }
  }


}
