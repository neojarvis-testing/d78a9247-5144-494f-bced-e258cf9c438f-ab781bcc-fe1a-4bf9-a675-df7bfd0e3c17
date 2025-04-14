import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService, private router : Router) {

  }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(localStorage.getItem('userId')){
      let jwtToken : string | null = localStorage.getItem('token');
      request = request.clone({
        setHeaders : {
          Authorization : `Bearer ${jwtToken}`
        }
      })
    }
    console.log(request);
    return next.handle(request);
  }
}
