import { Component, OnInit } from '@angular/core';
import { QuestionPaper } from "./question-papers.model";
import { QuestionPapersService } from "./question-papers.service";

@Component({
  selector: 'app-question-papers',
  templateUrl: './question-papers.component.html',
  styleUrls: ['./question-papers.component.css']
})
export class QuestionPapersComponent implements OnInit {

  public questionPaperList : QuestionPaper[] = [];
  constructor(private questionPaperService: QuestionPapersService){}


  ngOnInit(){
    this.questionPaperService.getQuestionsPaper()
    .subscribe(
      res => this.questionPaperList = res
    )
  }

  removeQuestionPaper(ques, index){
    if(window.confirm('Are you sure?')){
      this.questionPaperService.deleteQuestionPaper(ques._id).subscribe(
               success => {
                 this.questionPaperList = this.questionPaperList.filter((que) => que !== ques);
               }
          )
          this.questionPaperList.splice(index, 1);
      }
    }

}
