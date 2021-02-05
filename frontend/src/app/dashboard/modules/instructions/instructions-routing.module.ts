import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../core';

import { InstructionsComponent } from './instructions.component';
import { InstructionCreateComponent } from './instruction-create/instruction-create.component';
import { InstructionEditComponent } from './instruction-edit/instruction-edit.component';

const routes: Routes = [
  {
    path: '',
    component: InstructionsComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'create-instruction',
      component: InstructionCreateComponent
    }, {
      path: 'edit-instruction/:id',
      component: InstructionEditComponent
    },
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}
