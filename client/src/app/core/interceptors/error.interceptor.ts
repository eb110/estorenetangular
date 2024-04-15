//provide interceptor to the app module

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error){
          if(error.status === 400){
            if(error.error.errors){
              //mainly connected with a post
              //validation errors!!
              throw error.error;
            }
            else this.toastr.error(error.error.message, `${error.status}`)
          }
          if(error.status === 401){
            this.toastr.error(error.error.message, `${error.status}`)
          }
          //we want to sent error as a string to the component, reached by the navigation link
          //so the navigation link has to pass the data => navigation extras
          if(error.status === 500){
            const navigationExtras: NavigationExtras = {state: {error: error.error}}
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
          if(error.status === 404){
            this.router.navigateByUrl('/not-found');
          }
        }
        return throwError(() => new Error(error.message));
      })
    )
  }
}
