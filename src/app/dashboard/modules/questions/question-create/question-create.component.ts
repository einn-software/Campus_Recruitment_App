import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../questions.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question } from '../questions.model';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {

  public submitted: boolean = false;
  public questionForm: FormGroup = this.fb.group({
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
    weight: ['', [Validators.required]]
  });
  public question: Question[];

  get options(){
    return this.questionForm.get('options') as FormArray;
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
  }


  //Getter to access form control
  get myForm(){
    return this.questionForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.questionForm.valid){
      return false;
    }else{
      this.questionService.createQuestion(this.questionForm.value).subscribe(
        (res) => {
          console.log('Question created successfully!')
          this.router.navigateByUrl('/questions');
        }, (error) => {
          console.log(error);
        });
    }
  }

}
