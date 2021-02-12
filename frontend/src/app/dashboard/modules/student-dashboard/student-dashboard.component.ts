import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionPapersService } from '../question-papers/question-papers.service';
import { StudentService } from '../students/student.service';
import { saveData } from "./student-dash";

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  public code;
  public today = new Date();
  public id: string;
  public date = this.today.getDate();
  public month = this.today.getMonth() + 1;
  public year = this.today.getFullYear();
  public isExam: Boolean = false;
  constructor(
    private router: Router,
    private questionPaper: QuestionPapersService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.id = window.localStorage['id'];
    this.studentService.getStudentById(this.id).subscribe(res => {
     this.saveCode(res);
    })

  }
  saveCode(data){
    this.code = data.code;
    this.questionPaper.getQuestionPaperByCode(this.code, this.year, this.month, this.date).subscribe((res) => {
      // console.log("questionpapercomponent", res);
      saveData(res);
      window.localStorage['instructionID'] = res.instructions_id;
      window.localStorage['paperID'] = res._id;
      if(res._id){
        window.localStorage['questionPaperId'] = res._id;
        window.localStorage['ins'] = res.instructions_id;
        this.isExam = true;
        // console.log(this.isExam);
      }
    })
  }
  joinTest(){
    this.router.navigateByUrl('/join-test/instruction');
  }
  showDate(){
    // console.log(this.date);
    // console.log(this.month + 1);
    // console.log(this.year);
  }

}
