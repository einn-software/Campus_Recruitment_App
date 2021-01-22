import { Component, OnInit } from '@angular/core';
import { Question } from './questions.model';
import { QuestionService } from './questions.service';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-questions',
	templateUrl: './questions.component.html',
	styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {
  public questionList : Question[] = [];
  constructor(private questionService: QuestionService, private apiService: ApiService){}


  ngOnInit(){
    this.questionService.getQuestions()
    .subscribe(
      res => this.questionList = res
    )
  }

  removeQuestion(ques, index){
    if(window.confirm('Are you sure?')){
      this.questionService.deleteQuestion(ques._id).subscribe(
               res => this.questionList = res
          )
          this.questionList.splice(index, 1);
      }
    }
  }





