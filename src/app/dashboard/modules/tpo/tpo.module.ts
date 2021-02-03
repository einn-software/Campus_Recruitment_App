import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {TpoRoutingModule} from './tpo-routing.module';
import { TpoCreateComponent } from './tpo-create/tpo-create.component';
import { TpoEditComponent } from './tpo-edit/tpo-edit.component';
import {TpoService} from './tpo.service';

@NgModule({
  declarations: [
    TpoCreateComponent,
    TpoEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TpoRoutingModule
  ],
  providers: [TpoService]
})

export class TpoModule {}
