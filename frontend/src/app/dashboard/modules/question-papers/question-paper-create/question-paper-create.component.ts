import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionPapersService } from '../question-papers.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionPaper } from "../question-papers.model";
import { InstructionService } from '../../instructions/instructions.service';
import { ApiService } from 'src/app/core';
@Component({
  selector: 'app-question-paper-create',
  templateUrl: './question-paper-create.component.html',
  styleUrls: ['./question-paper-create.component.css']
})
export class QuestionPaperCreateComponent implements OnInit {
  public questionPaperForm: FormGroup
  public submitted: boolean = false;
  public instructionList: [];
  public collegeList: [];
  public data={
    papers: [{
    year: "",
    month: "",
    day: "",
    paper_name: "",
    paper_max_marks: "",
    max_time: "",
    instructions_id: "",
    code: "",
    start_time: "",
    trigger_type: "",
    enable: "",
    negative_marking_ratio: "",
    sections: [{
      section_name: "",
        section_marks: "",
        num_of_questions: "",
        question_list: [{
          question_id: "",
            question_marks: ""
    }]}
    ]
  }]
};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private questionPapersService: QuestionPapersService,
    private instructionService: InstructionService,
    private apiService: ApiService
  ) {
    this.questionPaperForm = this.fb.group({
      papers: this.fb.array([])
    })
    this.setPaper();
  }
  setPaper(){
    let control = <FormArray>this.questionPaperForm.controls.papers;
     this.data.papers.forEach(x=>{
       control.push(this.fb.group({
        year: x.year,
        month: x.month,
        day: x.day,
        paper_name: x.paper_name,
        paper_max_marks: x.paper_max_marks,
        max_time: x.max_time,
        instructions_id: x.instructions_id,
        code: x.code,
        start_time: x.start_time,
        trigger_type: x.trigger_type,
        enable: x.enable,
        negative_marking_ratio: x.negative_marking_ratio,
        sections: this.setSections(x),
       })
       )})
  }
  setSections(x){
    let arr = new FormArray([])
     x.sections.forEach(y=>{
       arr.push(this.fb.group({
        section_name: y.section_name,
        section_marks: y.section_marks,
        num_of_questions: y.num_of_questions,
        question_list: this.setQuestions(y),
       })
       )
      })
      return arr;

  }
  setQuestions(y){
    let arr = new FormArray([])
     y.question_list.forEach(z=>{
       arr.push(this.fb.group({
        question_id: z.question_id,
            question_marks: z.question_marks
       })
       )
      })
      return arr;
  }
  addNewPaper(){
    let control = <FormArray>this.questionPaperForm.controls.papers;
     control.push(this.fb.group({
      year: [''],
      month: [''],
      day: [''],
      paper_name: [''],
      paper_max_marks: [''],
      max_time: [''],
      instructions_id: [''],
      code: [''],
      start_time: [''],
      trigger_type: [''],
      enable: [''],
      negative_marking_ratio: [''],
      sections: this.fb.array([
        this.fb.group({
          section_name: [''],
          section_marks: [''],
          num_of_questions: [''],
          question_list: this.fb.array([
            this.fb.group({
              question_id: [''],
              question_marks: ['']
            })
          ])
        }),
      ])
     })
     )}

  addNewSection(control){
    control.push(
      this.fb.group({
        section_name: [''],
          section_marks: [''],
          num_of_questions: [''],
          question_list: this.fb.array([
            this.fb.group({
              question_id: [''],
              question_marks: ['']
            })
          ])
      })
    )
  }
  addNewQuestion(control){
    control.push(

            this.fb.group({
              question_id: [''],
              question_marks: ['']
            })
      )
  }
  deletePaper(index){
    let control = <FormArray>this.questionPaperForm.controls.papers;
    control.removeAt(index);
  }
  deleteSection(control, index){
    control.removeAt(index);
  }
  deleteQuestion(control, index){
    control.removeAt(index);
  }

  get myForm(){
    return this.questionPaperForm.controls;
  }

  ngOnInit(): void {
    this.instructionService.getInstructions().subscribe(
      res => {
        this.instructionList = res;
      })
      this.apiService.get('/colleges').subscribe(data=>{
        this.collegeList = data;
      })
  }

  onSubmit(){
    this.submitted = true;
    if(!this.questionPaperForm.valid){
      return false;
    }else{
      this.questionPapersService.createQuestionPaper(this.questionPaperForm.value).subscribe(
        (res) => {
          console.log('Question created successfully!')
          this.router.navigateByUrl('/questions-papers');
        }, (error) => {
          console.log(error);
        });
    }
  }

}
