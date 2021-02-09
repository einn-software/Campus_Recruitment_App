import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core';
import { DashboardComponent } from './dashboard.component';
import { DashComponent } from './modules/dash/dash.component';


import { StudentsComponent } from './modules/students/students.component';
import { StudentCreateComponent } from './modules/students/student-create/student-create.component';
import { StudentEditComponent } from "./modules/students/student-edit/student-edit.component";

import { QuestionsComponent } from './modules/questions/questions.component';
import { QuestionCreateComponent } from './modules/questions/question-create/question-create.component';
import { QuestionEditComponent } from './modules/questions/question-edit/question-edit.component';

import { QuestionPapersComponent } from './modules/question-papers/question-papers.component';
import { QuestionPaperCreateComponent } from './modules/question-papers/question-paper-create/question-paper-create.component';
import { QuestionPaperEditComponent } from './modules/question-papers/question-paper-edit/question-paper-edit.component';

import { InstructionsComponent } from './modules/instructions/instructions.component';
import { InstructionCreateComponent } from './modules/instructions/instruction-create/instruction-create.component';
import { InstructionEditComponent } from './modules/instructions/instruction-edit/instruction-edit.component';

import { AdminComponent } from './modules/admin/admin.component';
import { AdminCreateComponent } from './modules/admin/admin-create/admin-create.component';
import { AdminEditComponent } from './modules/admin/admin-edit/admin-edit.component';

import { CollegesComponent } from './modules/colleges/colleges.component';
import { CollegeCreateComponent } from './modules/colleges/college-create/college-create.component';
import { CollegeEditComponent } from './modules/colleges/college-edit/college-edit.component';

import { TpoComponent } from './modules/tpo/tpo.component';
import { TpoCreateComponent } from './modules/tpo/tpo-create/tpo-create.component';
import { TpoEditComponent } from './modules/tpo/tpo-edit/tpo-edit.component';

import { TpoDashboardComponent } from './modules/tpo-dashboard/tpo-dashboard.component';
import { StudentDashboardComponent } from './modules/student-dashboard/student-dashboard.component';
import { ShowResultComponent } from './modules/show-result/show-result.component';
import { UploadStudentListComponent } from './modules/upload-student-list/upload-student-list.component';
import { InstructionMessageComponent } from './modules/student-dashboard/instruction-message/instruction-message.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dash',
        children:[{
          path: 'admins',
          component: DashComponent
        },
        {
          path: 'tpos',
          component: TpoDashboardComponent
        }, {
          path: 'students',
          component: StudentDashboardComponent
        }
      ]
      }
      ,{
        path: 'questions',
        component: QuestionsComponent
      },
      {
        path: 'results',
        component: ShowResultComponent
      },
      {
        path: 'upload',
        component: UploadStudentListComponent
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
      path: 'create-question-paper',
      component: QuestionPaperCreateComponent
    },
    {
      path: 'edit-question-paper/:id',
      component: QuestionPaperEditComponent
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
      path: 'join-test/instruction',
      component: InstructionMessageComponent
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
      path: 'create-tpo',
      component: TpoCreateComponent
    },
    {
      path: 'edit-tpo/:id',
      component: TpoEditComponent
    },
    {
      path: 'students',
      component: StudentsComponent
    },

    {
      path: 'edit-student/:id',
      component: StudentEditComponent
    },
    {
      path: 'create-student',
      component: StudentCreateComponent
    }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
