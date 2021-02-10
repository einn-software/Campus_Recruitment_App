import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../core';

import { CollegesComponent } from './colleges.component';
import { CollegeCreateComponent } from './college-create/college-create.component';
import { CollegeEditComponent } from './college-edit/college-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CollegesComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'create-college',
      component: CollegeCreateComponent
    }, {
      path: 'edit-college/:id',
      component: CollegeEditComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CollegesRoutingModule{}
