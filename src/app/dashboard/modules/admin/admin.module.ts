import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminService } from './admin.service';
import { AdminCreateComponent } from './admin-create/admin-create.component';

@NgModule({
  declarations: [
    AdminEditComponent,
    AdminCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  providers: [AdminService]
})

export class AdminModule { }
