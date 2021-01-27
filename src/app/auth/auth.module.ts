import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { AccountComponent } from './account/account.component';
import { TpoLoginComponent } from './tpo/login/login.component';
import { TpoRegisterComponent } from './tpo/register/register.component';
import { TpoForgotPasswordComponent } from './tpo/forgot-password/forgot-password.component';
import { CollegeLoginComponent } from './college/login/login.component';
import { CollegeRegisterComponent } from './college/register/register.component';
import { CollegeForgotPasswordComponent } from './college/forgot-password/forgot-password.component';
import { StudentLoginComponent } from './student/login/login.component';
import { StudentRegisterComponent } from './student/register/register.component';
import { StudentForgotPasswordComponent } from './student/forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AccountComponent,
    TpoLoginComponent,
    TpoRegisterComponent,
    TpoForgotPasswordComponent,
    CollegeLoginComponent,
    CollegeRegisterComponent,
    CollegeForgotPasswordComponent,
    StudentLoginComponent,
    StudentRegisterComponent,
    StudentForgotPasswordComponent,
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
