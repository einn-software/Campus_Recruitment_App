import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../core';

import { QuestionPapersComponent } from './question-papers.component';
import { QuestionPaperCreateComponent } from './question-paper-create/question-paper-create.component';
import { QuestionPaperEditComponent } from './question-paper-edit/question-paper-edit.component';
import { QuestionPaperOpenComponent } from './question-paper-open/question-paper-open.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionPapersComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'create-question-paper',
      component: QuestionPaperCreateComponent
    },
    {
      path: 'open-question-paper/:id',
      component: QuestionPaperOpenComponent
    },
    {
      path: 'edit-question-paper/:id',
      component: QuestionPaperEditComponent
    },
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionPapersRoutingModule {}
