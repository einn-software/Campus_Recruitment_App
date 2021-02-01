import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

import {
  FooterComponent,
  HeaderComponent,
  SharedModule
} from './shared';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
=======

>>>>>>> aeed274502be1c6a733e44712655a0fd1782a48d


@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    DashboardModule,
<<<<<<< HEAD
    NgbModule
=======
    NgbModule,
>>>>>>> aeed274502be1c6a733e44712655a0fd1782a48d

  ],
  providers: [{
  provide: HTTP_INTERCEPTORS,
  useClass: HttpTokenInterceptor,
  multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule {}
