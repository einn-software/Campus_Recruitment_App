import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionCreateComponent } from './question-create/question-create.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionService } from './questions.service';


@NgModule({
  declarations: [
    QuestionCreateComponent,
    QuestionEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuestionsRoutingModule
  ],
  providers: [QuestionService]
})

export class QuestionsModule { }
