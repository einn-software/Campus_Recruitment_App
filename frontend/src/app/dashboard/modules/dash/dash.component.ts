import { Component, OnInit } from '@angular/core';
import { QuestionPaper } from '../question-papers/question-papers.model';
import { QuestionPapersService } from '../question-papers/question-papers.service';
import { Question } from '../questions/questions.model';
import { QuestionService } from '../questions/questions.service';
import { Instruction } from '../instructions/instructions.model';
import { InstructionService } from '../instructions/instructions.service';
import { User } from 'src/app/core';
import { AdminService } from '../admin/admin.service';
import { College } from '../colleges/colleges.model';
import { Student } from '../students/student.model';
import { Tpo } from '../tpo/tpo.model';
import { CollegeService } from '../colleges/colleges.service';
import { StudentService } from '../students/student.service';
import { TpoService } from '../tpo/tpo.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  public questionList : Question[] = [];
  public questionPaperList: QuestionPaper[] = [];
  public instructionList: Instruction[] = [];
  public adminList: User[] = [];
  public collegeList: College[] = [];
  public studentList: Student[] = [];
  public tpoList: Tpo[] = [];

  public quesLength: number;
  public quesPaperLength: number;
  public instructionLength:number;
  public adminLength: number;
  public collegeLength: number;
  //public studentLength: number;
  public tpoLength: number;

  constructor(
    private question: QuestionService,
    private questionPaper: QuestionPapersService,
    private instruction: InstructionService,
    private admin: AdminService,
    private colleges: CollegeService,
    //private students: StudentService,
    private tpo: TpoService,
  ) { }

  ngOnInit(): void {
    this.question.getQuestions()
    .subscribe((res) => {
        this.questionList = res
        this.quesLength = res.length
      }
    )

    this.questionPaper.getQuestionsPaper()
    .subscribe((res) => {
      this.questionPaperList = res
      this.quesPaperLength = res.length
    })

    this.instruction.getInstructions()
    .subscribe((res) => {
      this.instructionList = res
      this.instructionLength = res.length
    })

    this.admin.getAdmins()
    .subscribe((res) => {
      this.adminList = res
      this.adminLength = res.length
    })

    this.colleges.getColleges()
    .subscribe((res) => {
      this.collegeList = res
      this.collegeLength = res.length
    })

    this.tpo.getTPOs()
    .subscribe((res) => {
      this.tpoList = res
      this.tpoLength = res.length
    })
  }
}
