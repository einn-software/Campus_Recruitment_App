import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NoAuthGuard } from './no-auth-guard.service';

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
    children: [
      { path: 'admins', component: ForgotPasswordComponent, canActivate: [NoAuthGuard] },
      { path: 'tpos', component: ForgotPasswordComponent, canActivate: [NoAuthGuard] },
      { path: 'students', component: ForgotPasswordComponent, canActivate: [NoAuthGuard] }
    ],
  },
  {
    path: 'reset-password',
    children: [
      { path: 'admins', component: ResetPasswordComponent},
      { path: 'tpos', component: ResetPasswordComponent},
      { path: 'students', component: ResetPasswordComponent}
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
