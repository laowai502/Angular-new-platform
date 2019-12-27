import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Observable, pipe, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from 'primeng/api';

import * as _ from 'lodash';

@Injectable()
export class BaseHttpInterceptor implements HttpInterceptor {

    constructor(private msgs: MessageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpResponse<any>> {

        const self = this;
        // 请求时拦截，添加headers
        const requestInterceptor = this.dealRequest(req);
        return next.handle(requestInterceptor).pipe(
            // tap((event: HttpResponse<any>) => console.log(event)),
            catchError((err: HttpErrorResponse) => self.handleErrResponse(err))
        );
    }

    protected dealRequest(req: HttpRequest<any>): HttpRequest<any> {
        let headers = new HttpHeaders();
        headers.set('Pragma', 'no-caches')
            .set('Cache-Control', 'no-cache')
            .set('Accept', 'application/json');
            // .set('Cache-Control', 'no-store');
        if (environment.production) { // angular.json 可否配置webpack替换
            headers = this.setAuthorization(headers);
        }
        // headers = this.addAjaxHeaders(headers);
        return req.clone({ headers });
    }

    protected setAuthorization(headers: HttpHeaders): HttpHeaders {
        let authorization = headers ? headers.get('Authorization') : null;
        if (!authorization) {
            authorization = '';
        }
        if (!_.startsWith(authorization, 'Bearer')) {
            const token = sessionStorage.getItem('adal.access.token.key' + sessionStorage.getItem('adal.token.keys').substr(0, 36));
            if (token && headers) {
                headers = headers.set('Authorization', 'Bearer ' + token);
            }
        }
        return headers;
    }

    protected addAjaxHeaders(headers: HttpHeaders): HttpHeaders {
        if (headers) {
            headers = headers.set('X-Requested-With', 'XMLHttpRequest');
        }
        return headers;
    }

    // protected handleSucResponese(event: HttpEvent<any>, interceptObservable: Subject<HttpEvent<any>>): void {
    //     if (event instanceof HttpResponse) {
    //         interceptObservable.next(event);
    //         interceptObservable.complete();
    //     }
    // }

    protected handleErrResponse(err: any): Observable<any> {
        let msg = '';
        switch  (err.status) {
            case 400:
                msg = 'Bad request';
                break;
            case 401:
                msg = 'Not authorized';
                break;
            case 403:
                msg = 'Forbidden';
                break;
            case 404:
                msg = 'Resource not found';
                break;
            case 405:
                msg = 'Method not allowed';
                break;
            case 406:
                msg = 'Accept type is invalid';
                break;
            case 500:
                msg = 'Timeout or server error';
                break;
            case 502:
                msg = 'gateway error';
                break;
            default:
                msg = 'Timeout or server error';
        }
        this.msgs.add({ severity: 'error', detail: msg});
        return of(err);
    }

}
