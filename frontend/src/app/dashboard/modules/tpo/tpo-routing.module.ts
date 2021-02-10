import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../core';

import { TpoComponent } from './tpo.component';
import { TpoCreateComponent } from './tpo-create/tpo-create.component';
import { TpoEditComponent } from './tpo-edit/tpo-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TpoComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'create-tpo',
      component: TpoCreateComponent
    }, {
      path: 'edit-tpo/:id',
      component: TpoEditComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TpoRoutingModule{}
