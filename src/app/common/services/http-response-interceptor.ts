import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';  
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { finalize } from 'rxjs/operators/finalize';
import { NotificationService } from './notification.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

    constructor(public snackService: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        let ok: string;

        return next.handle(req)
        .pipe(
          tap(
            // Succeeds when there is a response; ignore other events
            event => {
              ok = event instanceof HttpResponse ? 'succeeded' : '';
            },
            // Operation failed; error is an HttpErrorResponse
            error => {
              this.snackService.error(error.error || 'Error');
              ok = 'failed';
            }
          ),
          // Log when response observable either completes or errors
          finalize(() => {
            const elapsed = Date.now() - started;
            const msg = `${req.method} "${req.urlWithParams}"
               ${ok} in ${elapsed} ms.`;
               console.log(msg);
          })
        );
    }
}