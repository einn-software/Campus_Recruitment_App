import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CollegeCreateComponent } from './college-create/college-create.component';
import { CollegeEditComponent } from './college-edit/college-edit.component';

import { CollegeService } from './colleges.service';


@NgModule({
  declarations: [CollegeCreateComponent, CollegeEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [CollegeService]
})

export class CollegeModule { }
