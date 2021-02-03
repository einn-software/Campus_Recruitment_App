import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionPapersService } from '../question-papers.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionPaper } from "../question-papers.model";
@Component({
  selector: 'app-question-paper-create',
  templateUrl: './question-paper-create.component.html',
  styleUrls: ['./question-paper-create.component.css']
})
export class QuestionPaperCreateComponent implements OnInit {

  public submitted: boolean = false;
  public questionPaperForm: FormGroup = this.fb.group({
    question: ['', [Validators.required]],
    topic: ['', [Validators.required]],
    options: this.fb.array([
      this.fb.group({
        index: ['', [Validators.required]],
        option: ['', [Validators.required]]
      }),
      this.fb.group({
        index: ['', [Validators.required]],
        option: ['', [Validators.required]]
      }),
      this.fb.group({
        index: ['', [Validators.required]],
        option: ['', [Validators.required]]
      }),
      this.fb.group({
        index: ['', [Validators.required]],
        option: ['', [Validators.required]]
      })
    ]),
    answer: ['', [Validators.required]],
    weight: ['', [Validators.required]]
  });
  public question: QuestionPaper[];

  get options(){
    return this.questionPaperForm.get('options') as FormArray;
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private questionPapersService: QuestionPapersService
  ) {}

  ngOnInit(): void {
  }


  //Getter to access form control
  get myForm(){
    return this.questionPaperForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.questionPaperForm.valid){
      return false;
    }else{
      this.questionPapersService.createQuestionPaper(this.questionPaperForm.value).subscribe(
        (res) => {
          console.log('Question created successfully!')
          this.router.navigateByUrl('/questions-papers');
        }, (error) => {
          console.log(error);
        });
    }
  }

}
