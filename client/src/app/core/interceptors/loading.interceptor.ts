//new interceptor => go to main app module

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  //busy service handles the spinner
  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //set the spinner to busy just before making the request
    this.busyService.busy();
    return next.handle(request).pipe(
      delay(1000),
      //if request finished
      finalize(() => this.busyService.idle())
    );
  }
}
