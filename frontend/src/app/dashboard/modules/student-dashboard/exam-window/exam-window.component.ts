import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core';
import { QuestionPapersService } from '../../question-papers/question-papers.service';
import { QuestionPaper } from "../../question-papers/question-papers.model";
import { AnswerSheet } from "../exam-window/answersheet.model";
import { Question } from "../../questions/questions.model";
import { QuestionService } from '../../questions/questions.service';

@Component({
  selector: 'app-exam-window',
  templateUrl: './exam-window.component.html',
  styleUrls: ['./exam-window.component.css']
})
export class ExamWindowComponent implements OnInit {

  public paper : QuestionPaper;
  public sections;
  public question_list;
  public questions = [{}];
  ngOnInit(): void {
    const id  = window.localStorage['paperID'];
    this.questionPaperService.getQuestionPaper(id).subscribe(res=>{
     this.paper = this.savePaper(res);
     this.sections = this.savePaper(this.paper.sections);
     this.sections.forEach(element => {
      element.question_list.forEach(q => {
        this.questionService.getQuestion(element.question_id).subscribe(resp=>{
          this.questions.push();
        })
      });
    });
    })
    console.log("ques", this.questions);
  }
  saveQuestions(res){
    return res;
  }
  savePaper(data){
    return data;
  }
  constructor(private questionPaperService: QuestionPapersService, private questionService: QuestionService) {
   }

}
