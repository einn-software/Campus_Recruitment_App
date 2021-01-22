import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../core';

import { QuestionsComponent } from './questions.component';
import { QuestionCreateComponent } from './question-create/question-create.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionListComponent } from './question-list/question-list.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'create-question',
      component: QuestionCreateComponent
    }, {
      path: 'edit-question/:id',
      component: QuestionEditComponent
    },
    {
      path: 'questions-list',
      component: QuestionListComponent
    }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}
