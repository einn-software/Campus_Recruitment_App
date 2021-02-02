import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core';
import { DashboardComponent } from './dashboard.component';
import { DashComponent } from './modules/dash/dash.component';

import { QuestionPapersComponent } from './modules/question-papers/question-papers.component';


import { TpoComponent } from './modules/tpo/tpo.component';
import { StudentsComponent } from './modules/students/students.component';

import { QuestionsComponent } from './modules/questions/questions.component';
import { QuestionCreateComponent } from './modules/questions/question-create/question-create.component';
import { QuestionEditComponent } from './modules/questions/question-edit/question-edit.component';

import { InstructionsComponent } from './modules/instructions/instructions.component';
import { InstructionCreateComponent } from './modules/instructions/instruction-create/instruction-create.component';
import { InstructionEditComponent } from './modules/instructions/instruction-edit/instruction-edit.component';

import { AdminComponent } from './modules/admin/admin.component';
import { AdminCreateComponent } from './modules/admin/admin-create/admin-create.component';
import { AdminEditComponent } from './modules/admin/admin-edit/admin-edit.component';

import { CollegesComponent } from './modules/colleges/colleges.component';
import { CollegeCreateComponent } from './modules/colleges/college-create/college-create.component';
import { CollegeEditComponent } from './modules/colleges/college-edit/college-edit.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'dash',
      component: DashComponent
    },{
      path: 'questions',
      component: QuestionsComponent
    },
    {
      path: 'create-question',
      component: QuestionCreateComponent
    },
    {
      path: 'edit-question/:id',
      component: QuestionEditComponent
    },
    {
      path: 'question-papers',
      component: QuestionPapersComponent
    },
    {
      path: 'instructions',
      component: InstructionsComponent
    },
    {
      path: 'create-instruction',
      component: InstructionCreateComponent
    },
    {
      path: 'edit-instruction/:id',
      component: InstructionEditComponent
    },
    {
      path: 'admin',
      component: AdminComponent
    },
    {
      path: 'create-admin',
      component: AdminCreateComponent
    },
    {
      path: 'edit-admin/:id',
      component: AdminEditComponent
    },
    {
      path: 'colleges',
      component: CollegesComponent
    },
    {
      path: 'create-college',
      component: CollegeCreateComponent
    },
    {
      path: 'edit-college/:id',
      component: CollegeEditComponent
    },
    {
      path: 'tpo',
      component: TpoComponent
    },
    {
      path: 'students',
      component: StudentsComponent
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
