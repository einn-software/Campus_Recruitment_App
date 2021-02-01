import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminEditComponent } from './admin-edit/admin-edit.component';

import { AdminService } from './admin.service';

@NgModule({
  declarations: [
    AdminEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [AdminService]
})

export class AdminModule { }
