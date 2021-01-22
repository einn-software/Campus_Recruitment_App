import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../questions.model';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionService} from '../questions.service';
import { ApiService } from 'src/app/core';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  public submitted: boolean = false;
  public editForm: FormGroup = this.fb.group({
    question: ['', [Validators.required]],
    topic: ['', [Validators.required]],
    options: this.fb.array([
      this.fb.group({
        index: ['', [Validators.required]],
        option: ['', [Validators.required]]
      }),
      this.fb.group({
        index: ['', [Validators.required]],
        option: ['', [Validators.required]]
      }),
      this.fb.group({
        index: ['', [Validators.required]],
        option: ['', [Validators.required]]
      }),
      this.fb.group({
        index: ['', [Validators.required]],
        option: ['', [Validators.required]]
      })
    ]),
    weight: ['', [Validators.required]]
  });
  public question: Question[] = [];

  get options() {
    return this.editForm.get('options') as FormArray;
  }

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.getQuestion(id);
  }


  //Getter to access form control
  get myForm(){
    return this.editForm.controls;
  }

  getQuestion(id){
    this.questionService.getQuestion(id).subscribe(res => {
      this.editForm.patchValue(res);
    });
}



  onSubmit(){
    this.submitted = true;
    if(!this.editForm.valid){
      return false;
    }else{
      if(window.confirm('Are you sure?')){
        let id = this.route.snapshot.paramMap.get('id');
        this.questionService.updateQuestion(id, this.editForm.value)
        .subscribe(res => {
          res => this.editForm = res
          console.log(res);
          this.router.navigateByUrl('/questions');
          console.log('Content updated successfully!');
        }, (error) => {
          console.log(error);
        })
      }
    }
  }

}
