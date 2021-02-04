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
    year: ['', [Validators.required]],
    month: ['', [Validators.required]],
    day: ['', [Validators.required]],
    paper_name: ['', [Validators.required]],
    paper_max_marks: ['', [Validators.required]],
    max_time: ['', [Validators.required]],
    instructions_id: ['', [Validators.required]],
    code: ['', [Validators.required]],
    start_time: ['', [Validators.required]],
    trigger_type: ['', [Validators.required]],
    enable: ['', [Validators.required]],
    negative_marking_ratio: ['', [Validators.required]],
    sections: this.fb.array([
      this.fb.group({
        section_name: ['', [Validators.required]],
        section_marks: ['', [Validators.required]],
        num_of_questions: ['', [Validators.required]],
        question_list: this.fb.array([
          this.fb.group({
            question_id: ['', [Validators.required]],
            question_marks: ['', [Validators.required]]
          })
        ])
      }),
    ])
  });
  public questionPaper: QuestionPaper[];

  get sections(){
    return this.questionPaperForm.get('sections') as FormArray;
  }

  get question_list(){
    return this.questionPaperForm.get('question_list') as FormArray;
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
