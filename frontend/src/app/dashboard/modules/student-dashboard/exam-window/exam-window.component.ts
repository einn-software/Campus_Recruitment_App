import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core';
import { QuestionPapersService } from '../../question-papers/question-papers.service';
import { QuestionPaper } from "../../question-papers/question-papers.model";
import { AnswerSheet } from "../models/answersheet.model";
import { Question } from "../../questions/questions.model";
import { QuestionService } from '../../questions/questions.service';
import { QuizConfig } from "../models/config";
import { QuizService } from "./quiz.service";
import { StudentService } from '../../students/student.service';

@Component({
  selector: 'app-exam-window',
  templateUrl: './exam-window.component.html',
  styleUrls: ['./exam-window.component.css']
})
export class ExamWindowComponent implements OnInit {
  public answerSheet: AnswerSheet[]
  public pager = {
    index: 0,
    size: 1,
    count: 0
  };
  public timer: any = null;
  public result = {};
  public mode :string = 'quiz';
  public startTime: Date;
  public endTime: Date;
  public ellapsedTime = '00:00';
  public duration = null;
  public config: QuizConfig = {
    'allowBack': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': null,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
  };
  public marks = [{
    qId: '',
    marks: null,
    answerSheetId: ''
  }];
  public studentID : string;
  public paperID : string;
  public color: string;
  public state: number = 6;
  public section_id : string;
  public paper : QuestionPaper;
  public sections;
  public selected_option;
  public question_list_length = [] ;
  public questions = [];
  public ques_list = [];
  public ansSheet = [];
  ngOnInit(): void {
    const id = this.paperID = window.localStorage['paperID'];
    this.questionPaperService.getQuestionPaper(id).subscribe(res=>{
     this.paper = this.savePaper(res);
     this.config.duration = parseInt(this.paper.max_time) * 60;
     this.sections = this.savePaper(this.paper.sections);
     this.section_id = this.sections[0]._id
     this.loadQuiz(this.section_id);
     let marks =[];
     this.studentID = window.localStorage['id'];
     this.sections.forEach(element => {
       element.question_list.forEach(el => {
        this.quizService.createAnswerSheet({
          student_id: this.studentID,
          question_paper_id: this.paperID,
          question_id: el.question_id,
          selected_option: 1,
          state: 6,
          question_max_marks: el.question_marks
        }).subscribe((res)=>{
          if(res._id){
            marks.push({
              qId: res.question_id,
              answerSheetId: res._id
            })
            this.ansSheet.push(res);
            console.log("post", res);
          }
        })
      });
     });
     this.marks = marks;
     console.log(this.marks);
    this.startTime = new Date();
    this.ellapsedTime = '00:00';
    this.timer = setInterval(() => { this.tick(); }, 1000);
    this.duration = this.parseTime(this.config.duration);
    this.studentID = window.localStorage['id'];
    })
  }
loadQuiz(sectionId: string){
  for (var i = 0; i<this.sections.length; i++){
    if(this.sections[i]._id === sectionId){
      let ques = [];
      this.pager.count = this.sections[i].question_list.length;
      for (var j = 0; j< this.sections[i].question_list.length; j++){
        this.questionService.getQuestion(this.sections[i].question_list[j].question_id).subscribe(resp=>{
         ques.push({
           _id: resp._id,
           question: resp.question,
           topic: resp.topic,
           options: [{
             _id: resp.options[0]._id,
             index: resp.options[0].index,
             option: resp.options[0].option,
             selected: false
           },
           {
             _id: resp.options[1]._id,
             index: resp.options[1].index,
             option: resp.options[1].option,
             selected: false
           },
           {
             _id: resp.options[2]._id,
             index: resp.options[2].index,
             option: resp.options[2].option,
             selected: false
           },
           {
             _id: resp.options[3]._id,
             index: resp.options[3].index,
             option: resp.options[3].option,
             selected: false
           }
         ],
           answer: resp.answer,
           weight: resp.weight,
           state: 6
         });
     })
       }
       this.questions = ques;
    }
  }
  this.mode = 'quiz';
}
  onSelect(question, option) {
    this.selected_option = option;
    for(var i = 0; i<this.questions.length; i++){
      if(this.questions[i].qId === question._id){
      this.questions[i].options.forEach((x) => { if (x.index !== option.index) {x.selected = false;}else{x.selected = true;} });
    }
  }
    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }
  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }
  callService(question, state: number){
    for(var i = 0; i<this.marks.length; i++){
      if(this.marks[i].qId === question._id){
        this.questions[i].state = state;
        console.log(this.state);
          this.quizService.updateAnswerSheet(this.marks[i].answerSheetId, {
            selected_option: this.selected_option.index,
            state: state
          }).subscribe(resp=>{
          })
      }
    }
  }
  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }
  get filteredQuestions() {
    return (this.questions) ?
      this.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
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
  onSubmit(){
    this.quizService.finalSubmission({
      student_id: this.studentID,
          question_paper_id: this.paperID
    }).subscribe((res)=>{
    })
    this.studentService.getStudentById(this.studentID).subscribe((std)=>{
      this.quizService.getResult(std.code, std.roll, this.paperID).subscribe((res)=>{
        this.result = res;
      })
    })
    this.mode = 'result';
  }
  constructor(private questionPaperService: QuestionPapersService, private questionService: QuestionService, private quizService: QuizService, private studentService: StudentService) {
   }

}
