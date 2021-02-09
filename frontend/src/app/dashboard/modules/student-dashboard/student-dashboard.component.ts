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
public code;
  public today = new Date();
  public id: string;
  public date = this.today.getDate();
  public month = this.today.getMonth() + 1;
  public year = this.today.getFullYear();
  public isExam: Boolean = false;
  constructor(
    private apiService: ApiService,
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
      console.log("questionpapercomponent", res);
      if(res._id){
        this.isExam = true;
        console.log(this.isExam);
      }
    })
  }
  joinTest(){
    this.router.navigateByUrl('/join-test/instruction');
  }

  showDate(){
    console.log(this.date);
    console.log(this.month + 1);
    console.log(this.year);
  }

}
