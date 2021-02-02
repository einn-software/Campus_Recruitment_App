import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { QuestionsModule } from './modules/questions/questions.module';
import { InstructionsModule } from './modules/instructions/instructions.module';
import { AdminModule } from './modules/admin/admin.module';
import { CollegeModule } from './modules/colleges/colleges.module';
import { TpoModule } from './modules/tpo/tpo.module';

import { DashboardComponent } from './dashboard.component';
import { DashComponent } from './modules/dash/dash.component';
import { QuestionsComponent } from './modules/questions/questions.component';
import { QuestionPapersComponent } from './modules/question-papers/question-papers.component';
import { InstructionsComponent } from './modules/instructions/instructions.component';
import { CollegesComponent } from './modules/colleges/colleges.component';
import { TpoComponent } from './modules/tpo/tpo.component';
import { StudentsComponent } from './modules/students/students.component';
import { AdminComponent } from './modules/admin/admin.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    QuestionsModule,
    InstructionsModule,
    AdminModule,
    CollegeModule,
    TpoModule
  ],
  declarations: [
    DashboardComponent,
    DashComponent,
    QuestionsComponent,
    QuestionPapersComponent,
    InstructionsComponent,
    CollegesComponent,
    TpoComponent,
    StudentsComponent,
    AdminComponent
  ],

})
export class DashboardModule {}

