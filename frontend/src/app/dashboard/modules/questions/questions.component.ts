import { Component, OnInit } from '@angular/core';
import { Question } from './questions.model';
import { QuestionService } from './questions.service';

@Component({
	selector: 'app-questions',
	templateUrl: './questions.component.html',
	styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {
  public questionList : Question[] = [];
  constructor(private questionService: QuestionService){}


  ngOnInit(){
    this.questionService.getQuestions()
    .subscribe(
      res => this.questionList = res
    )
  }

  removeQuestion(ques, index){
    if(window.confirm('Are you sure?')){
      this.questionService.deleteQuestion(ques._id).subscribe(
               success => {
                 this.questionList = this.questionList.filter((que) => que !== ques);
               }
          )
          this.questionList.splice(index, 1);
      }
    }

  }





