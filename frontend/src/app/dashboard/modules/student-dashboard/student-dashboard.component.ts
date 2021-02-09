import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core';
import { Router } from '@angular/router';
import { QuestionPapersService } from '../question-papers/question-papers.service';
import { StudentService } from '../students/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  public code: number;
  public studentData: {};
  public today = new Date();
  public date = this.today.getDate();
  public month = this.today.getMonth() + 1;
  public year = this.today.getFullYear();
  constructor(
    private apiService: ApiService,
    private router: Router,
    private questionPaper: QuestionPapersService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    let id = window.localStorage['id'];
      let std = this.studentService.getStudentById(id).subscribe(res => {
        return res;
      })
      console.log(std);
         console.log("studentdata", this.studentData, window.localStorage['code']);
    this.code = window.localStorage['code'];
    this.questionPaper.getQuestionPaperByCode(this.code, this.year, this.month, this.date).subscribe((res) => {
      console.log("questionpapercomponent", res);
    })
  }

  joinTest(){
    this.router.navigateByUrl('/instructions');
  }

  showDate(){
    console.log(this.date);
    console.log(this.month + 1);
    console.log(this.year);
  }

}
