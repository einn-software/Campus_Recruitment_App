import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { TpoLoginComponent } from './tpo/login/login.component';
import { TpoRegisterComponent } from './tpo/register/register.component';
import { TpoForgotPasswordComponent } from './tpo/forgot-password/forgot-password.component';
import { CollegeLoginComponent } from './college/login/login.component';
import { CollegeRegisterComponent } from './college/register/register.component';
import { CollegeForgotPasswordComponent } from './college/forgot-password/forgot-password.component';
import { StudentLoginComponent } from './student/login/login.component';
import { StudentRegisterComponent } from './student/register/register.component';
import { StudentForgotPasswordComponent } from './student/forgot-password/forgot-password.component';
import { NoAuthGuard } from './no-auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'tpo-login',
    component: TpoLoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'tpo-register',
    component: TpoRegisterComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'tpo-forgot-password',
    component: TpoForgotPasswordComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'student-login',
    component: StudentLoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'student-register',
    component: StudentRegisterComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'student-forgot-password',
    component: StudentForgotPasswordComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'college-login',
    component: CollegeLoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'college-register',
    component: CollegeRegisterComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'college-forgot-password',
    component: CollegeForgotPasswordComponent,
    canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
