import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { QuestionPaper } from '../question-papers.model';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionPapersService } from '../question-papers.service';
import { ApiService } from 'src/app/core';
@Component({
  selector: 'app-question-paper-edit',
  templateUrl: './question-paper-edit.component.html',
  styleUrls: ['./question-paper-edit.component.css']
})
export class QuestionPaperEditComponent implements OnInit {
  clg : [];
  instruction : [];
  question : [];
  public submitted: boolean = false;
  public editForm: FormGroup = this.fb.group({
    year: ['', [Validators.required]],
    month: ['', [Validators.required]],
    day: ['', [Validators.required]],
    name: ['', [Validators.required]],
    marks: ['', [Validators.required]],
    time: ['', [Validators.required]],
    instructions_id: ['', [Validators.required]],
    code: ['', [Validators.required]],
    start_time: ['', [Validators.required]],
    trigger_ype: ['', [Validators.required]],
    negative_marks_ratio: ['', [Validators.required]],
    sections: this.fb.array([
      this.fb.group({
        section_name: ['', [Validators.required]]
      }),
      this.fb.group({
        section_marks: ['', [Validators.required]]
      }),
      this.fb.group({
        no_of_questions: ['', [Validators.required]]
      }),
      this.fb.group({
        question_list: this.fb.array([
          this.fb.group({
            question_id: ['', [Validators.required]]
          }),
          this.fb.group({
            question_marks: ['', [Validators.required]]
          }),
        ])
      })
    ]),
  });
  public questionPaper: QuestionPaper[] = [];

  get options() {
    return this.editForm.get('options') as FormArray;
  }

  constructor(
    private questionPaperService: QuestionPapersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.getQuestionPaper(id);
    this.apiService.get('/colleges')
      .subscribe(
        data => {
          this.clg = data;
        }
      );
      this.apiService.get('/instructions')
      .subscribe(
        data => {
          this.instruction = data;
        }
      );
      this.apiService.get('/questions')
      .subscribe(
        data => {
          this.question = data;
        }
      );
  }


  //Getter to access form control
  get myForm(){
    return this.editForm.controls;
  }

  getQuestionPaper(id){
    this.questionPaperService.getQuestionPaper(id).subscribe(res => {
      this.editForm.patchValue(res);
    });
}



  onSubmit(){
    this.submitted = true;
    if(!this.editForm.valid){
      return false;
    }else{
      if(window.confirm('Are you sure?')){
        let id = this.route.snapshot.paramMap.get('id');
        this.questionPaperService.updateQuestionPaper(id, this.editForm.value)
        .subscribe(res => {
          res => this.editForm = res
          this.router.navigateByUrl('/question-papers');
          console.log('Content updated successfully!');
        }, (error) => {
          console.log(error);
        })
      }
    }
  }

}
