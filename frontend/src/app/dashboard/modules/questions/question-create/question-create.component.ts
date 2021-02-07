import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public questionForm: FormGroup;
  data = {
    questions:[{
    question: "",
  topic: "",
  options: [
   { index: "",
  option: "",
   }
  ],
  answer: "",
  weight: "",
}]
  }

  constructor(private fb: FormBuilder, private router: Router, private questionService: QuestionService) {
    this.questionForm = this.fb.group({
      questions: this.fb.array([])
    })
    this.setQuestions();
   }
   setQuestions(){
     let control = <FormArray>this.questionForm.controls.questions;
     this.data.questions.forEach(x=>{
       control.push(this.fb.group({
         question: x.question,
         topic: x.topic,
         options: this.setOptions(x),
         answer: x.answer,
         weight: x.weight
       }))
     })
   }
   setOptions(x){
     let arr = new FormArray([])
     x.options.forEach(y=>{
       arr.push(this.fb.group({
         index: y.index,
         option: y.option
       }));
       arr.push(this.fb.group({
        index: y.index,
        option: y.option
      }));
      arr.push(this.fb.group({
        index: y.index,
        option: y.option
      }));
      arr.push(this.fb.group({
        index: y.index,
        option: y.option
      }));
     })
     return arr;
   }
   addNewQuestion(){
     let control = <FormArray>this.questionForm.controls.questions;
     control.push(this.fb.group({
      question: [''],
      topic: [''],
      options: this.fb.array([
        this.fb.group({
          index: [''],
         option: ['']
        }),
        this.fb.group({
          index: [''],
         option: ['']
        }),
        this.fb.group({
          index: [''],
         option: ['']
        }),
        this.fb.group({
          index: [''],
         option: ['']
        }),
      ]),
      answer: [''],
      weight: ['']
     }))
   }
   deleteQuestion(index){
    let control = <FormArray>this.questionForm.controls.questions;
    control.removeAt(index);
   }
   addNewOption(control){
     control.push(
       this.fb.group({
         index: [''],
         option: ['']
       })
     )
   }
   deleteOption(control, index){
     control.removeAt(index);
   }
  ngOnInit() {
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
