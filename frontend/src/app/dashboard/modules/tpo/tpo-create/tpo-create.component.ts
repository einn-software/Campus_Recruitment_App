import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TpoService } from '../tpo.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Tpo } from '../tpo.model';
import { ApiService } from 'src/app/core';

@Component({
  selector: 'app-tpo-create',
  templateUrl: './tpo-create.component.html',
  styleUrls: ['./tpo-create.component.css']
})

export class TpoCreateComponent implements OnInit {
  public submitted: boolean = false;
  data={
    tpos: [{
      name: "",
    email: "",
    password: "",
    phone: "",
    designation: "",
    college: "",
    code: ""
    }]
  }
  public tpoForm: FormGroup
  public tpo: Tpo[];
  public cld: [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tpoService: TpoService,
    private apiService: ApiService
  ) {
    this.tpoForm = this.fb.group({
      tpos: this.fb.array([])
    })
    this.setTpos();
   }
   setTpos(){
    let control = <FormArray>this.tpoForm.controls.tpos;
    this.data.tpos.forEach(x=>{
      control.push(this.fb.group({
      name: x.name,
      email: x.email,
      password: x.password,
      phone: x.phone,
      designation: x.designation,
    college: x.college,
    code: x.code
    })
    )})
   }
   addTpos(){
    let control = <FormArray>this.tpoForm.controls.tpos;
      control.push(this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      phone: [''],
      designation: [''],
    college: [''],
    code: ['']
    })
    )
   }
   removeTpos(index){
    let control = <FormArray>this.tpoForm.controls.tpos;
    control.removeAt(index);
   }
  ngOnInit(): void {
    this.apiService.get('/colleges').subscribe(data=>{
      console.log(data);
      this.cld = data;
    })
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
