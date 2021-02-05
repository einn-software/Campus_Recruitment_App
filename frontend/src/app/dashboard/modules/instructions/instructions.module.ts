import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InstructionCreateComponent } from './instruction-create/instruction-create.component';
import { InstructionEditComponent } from './instruction-edit/instruction-edit.component';

import { InstructionService } from './instructions.service';

@NgModule({
  declarations: [
    InstructionCreateComponent,
    InstructionEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [InstructionService]
})

export class InstructionsModule { }
