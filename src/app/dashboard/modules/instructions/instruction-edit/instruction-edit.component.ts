import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instruction } from '../instructions.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstructionService } from '../instructions.service';


@Component({
  selector: 'app-instruction-edit',
  templateUrl: './instruction-edit.component.html',
  styleUrls: ['./instruction-edit.component.css']
})
export class InstructionEditComponent implements OnInit {
  public submitted: boolean = false;
  public instructionForm: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
    message: ['', [Validators.required]],
    year: ['', [Validators.required]],
    month: ['', [Validators.required]],
    day: ['', [Validators.required]]
  });
  public instruction: Instruction[] = [];


  constructor(
    private instructionService: InstructionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.getInstruction(id);
  }

  get myForm(){
    return this.instructionForm.controls;
  }

  getInstruction(id){
    this.instructionService.getInstruction(id).subscribe(res => {
      this.instructionForm.patchValue(res);
    });
  }

  onSubmit(){
    this.submitted = true;
    if(!this.instructionForm.valid){
      return false;
    }else{
      if(window.confirm('Are you sure?')){
        let id = this.route.snapshot.paramMap.get('id');
        this.instructionService.updateInstruction(id, this.instructionForm.value)
        .subscribe(res => {
          res => this.instructionForm = res
          this.router.navigateByUrl('/instructions');
          console.log('Content updated successfully!');
        }, (error) => {
          console.log(error);
        })
      }
    }
  }

}
