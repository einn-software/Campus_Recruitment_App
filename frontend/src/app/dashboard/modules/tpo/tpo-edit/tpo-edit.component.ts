import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tpo } from '../tpo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TpoService } from '../tpo.service';

@Component({
  selector: 'app-tpo-edit',
  templateUrl: './tpo-edit.component.html',
  styleUrls: ['./tpo-edit.component.css']
})

export class TpoEditComponent implements OnInit {
  public submitted: boolean = false;
  public tpoForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    designation: ['', [Validators.required]]
  });
  public tpo: Tpo[] = [];

  constructor(
    private tpoService: TpoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.getTpo(id);
  }

  get myForm(){
    return this.tpoForm.controls;
  }

  getTpo(id){
    this.tpoService.getTpo(id).subscribe(res => {
      this.tpoForm.patchValue(res);
    });
  }

  onSubmit(){
    this.submitted = true;
    if(!this.tpoForm.valid){
      return false;
    }else{
      if(window.confirm('Are you sure?')){
        let id = this.route.snapshot.paramMap.get('id');
        this.tpoService.updateTPO(id, this.tpoForm.value)
        .subscribe(res => {
          res => this.tpoForm = res
          this.router.navigateByUrl('/tpo');
          console.log('Content updated successfully!');
        }, (error) => {
          console.log(error);
        })
      }
    }
  }



}
