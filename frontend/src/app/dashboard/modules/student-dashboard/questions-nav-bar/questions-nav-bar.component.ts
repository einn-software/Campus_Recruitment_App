import { Component, OnInit } from '@angular/core';
import { QuestionPapersService } from '../../question-papers/question-papers.service';
import { QuestionPaper } from "../../question-papers/question-papers.model";
import { AnswerSheet } from "../exam-window/answersheet.model";
import { Question } from "../../questions/questions.model";

@Component({
  selector: 'app-questions-nav-bar',
  templateUrl: './questions-nav-bar.component.html',
  styleUrls: ['./questions-nav-bar.component.css']
})
export class QuestionsNavBarComponent implements OnInit {

  public paper : QuestionPaper;
  public sections;
  public questions;
  ngOnInit(): void {
    const id  = window.localStorage['paperID'];
    this.questionPaperService.getQuestionPaper(id).subscribe(res=>{
     this.paper = this.savePaper(res);
     this.sections = this.paper.sections;
     this.sections.forEach(element => {
       this.questions = element.question_list;
     });
    })
  }
  savePaper(data){
    return data;
  }
  constructor(private questionPaperService: QuestionPapersService) {
   }

  isAnswered(question: Question) {
    // return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };


}
