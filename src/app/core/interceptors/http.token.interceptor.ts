import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwtService.getToken();
    const role = this.jwtService.getUserRole();

    if (token) {
      headersConfig['auth-token'] = `${token}`;
      // headersConfig['user_type'] = `${role}`
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
