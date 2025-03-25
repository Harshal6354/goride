import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service1Service } from '../../../services/service1.service';

@Injectable()
export class Auth2Interceptor implements HttpInterceptor {

  constructor(private service1:Service1Service) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    return next.handle(request);
  }
}
