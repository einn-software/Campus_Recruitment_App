import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructionService } from '../instructions.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Instruction } from '../instructions.model';

@Component({
  selector: 'app-instruction-create',
  templateUrl: './instruction-create.component.html',
  styleUrls: ['./instruction-create.component.css']
})
export class InstructionCreateComponent implements OnInit {
  public submitted: boolean = false;
  public instructionForm: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
    message: ['', [Validators.required]],
    year: ['', [Validators.required]],
    month: ['', [Validators.required]],
    day: ['', [Validators.required]]
  });
  public instruction: Instruction[];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private instructionService: InstructionService
  ) { }

  ngOnInit(): void {
  }

  get myForm(){
    return this.instructionForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.instructionForm.valid){
      return false;
    }else{
      this.instructionService.createInstruction(this.instructionForm.value).subscribe(
        (res) => {
          // console.log('Instruction created successfully!')
          this.router.navigateByUrl('/instructions');
        }, (error) => {
          // console.log(error);
        });
    }
  }

}
