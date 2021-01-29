import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
        children: [
            { path: 'admins', component: LoginComponent, canActivate: [NoAuthGuard] },
            { path: 'tpos', component: LoginComponent, canActivate: [NoAuthGuard] },
            { path: 'students', component: LoginComponent, canActivate: [NoAuthGuard] }
          ],
        },
  {
    path: 'register',
        children: [
            { path: 'admins', component: RegisterComponent, canActivate: [NoAuthGuard] },
            { path: 'tpos', component: RegisterComponent, canActivate: [NoAuthGuard] },
            { path: 'colleges', component: RegisterComponent, canActivate: [NoAuthGuard] },
            { path: 'students', component: RegisterComponent, canActivate: [NoAuthGuard] }
          ],
        },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
