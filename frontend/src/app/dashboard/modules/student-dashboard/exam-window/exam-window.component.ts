import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core';
import { QuestionPapersService } from '../../question-papers/question-papers.service';
import { QuestionPaper } from "../../question-papers/question-papers.model";
import { AnswerSheet } from "../exam-window/answersheet.model";
import { Question } from "../../questions/questions.model";
import { QuestionService } from '../../questions/questions.service';
import { QuizConfig } from "./config";

@Component({
  selector: 'app-exam-window',
  templateUrl: './exam-window.component.html',
  styleUrls: ['./exam-window.component.css']
})
export class ExamWindowComponent implements OnInit {
  public pager = {
    index: 0,
    size: 1,
    count: 1
  };
  public timer: any = null;
  public startTime: Date;
  public endTime: Date;
  public ellapsedTime = '00:00';
  public duration = '';
  public config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };
  public paper : QuestionPaper;
  public sections;
  public question_list;
  public questions = [];
  ngOnInit(): void {
    const id  = window.localStorage['paperID'];
    this.questionPaperService.getQuestionPaper(id).subscribe(res=>{
     this.paper = this.savePaper(res);
     this.sections = this.savePaper(this.paper.sections);
     this.sections.forEach(element => {
          for (var i = 0; i< element.question_list.length; i++){
           this.questionService.getQuestion(element.question_list[i].question_id).subscribe(resp=>{
            this.questions.push({
              _id: resp._id,
              question: resp.question,
              topic: resp.topic,
              options: [{
                _id: resp.options[0]._id,
                index: resp.options[0].index,
                option: resp.options[0].option
              },
              {
                _id: resp.options[1]._id,
                index: resp.options[1].index,
                option: resp.options[1].option
              },
              {
                _id: resp.options[2]._id,
                index: resp.options[2].index,
                option: resp.options[2].option
              },
              {
                _id: resp.options[3]._id,
                index: resp.options[3].index,
                option: resp.options[3].option
              }
            ],
              answer: resp.answer,
              weight: resp.weight
            });

        })
          }
    });
    })
   this.pager.count = this.questions.length;
    this.startTime = new Date();
    this.ellapsedTime = '00:00';
    this.timer = setInterval(() => { this.tick(); }, 1000);
    this.duration = this.parseTime(this.config.duration);
    console.log("ques", this.questions);
  }
  get filteredQuestions() {
    return (this.questions) ?
      this.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }
  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }
  savePaper(data){
    return data;
  }
  onSubmit(){}
  constructor(private questionPaperService: QuestionPapersService, private questionService: QuestionService) {
   }

}
