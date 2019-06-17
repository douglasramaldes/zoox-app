import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url == `${config.apiUrl}/api/signup`) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                }
            });
        }
        if (request.url !== `${config.apiUrl}/api/signup`) {
            request = request.clone({
                setHeaders: this.requestHeaders()
            });
        }

        return next.handle(request);
    }

    private requestHeaders() {
        let headers
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined')
            headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }

        if (localStorage.getItem('token') === null || localStorage.getItem('token') === 'undefined')
            headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

        return headers
    }
}

