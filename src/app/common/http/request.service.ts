import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { removeObjectEmpty, removeObjectEmptyValue } from '../util';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable()
export class RequestService {

    // private baseUrl = environment.apiUrl;
    private baseUrl = environment.middleApiUrl;

    protected constructor(private http: HttpClient) {}

    private makeUrl(url: string = ''): string {
        const str = _.startsWith(url, ['http://', 'https://']) ? url : (this.baseUrl + url);
        return str;
    }

    public get(url: string, params?: object): Promise<any> {
        let httpParams = new HttpParams();
        if (params) {
            params = removeObjectEmptyValue(params); // remove null, undefined, empty string
            // tslint:disable-next-line: forin
            for (const key in params) {
                httpParams = httpParams.set(key, params[key]);
            }
        }
        return this.http.get(this.makeUrl(url), { params: httpParams }).toPromise();
    }

    public post(url: string, params?: any, opts?: object): Promise<any> {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
        if (!_.isEmpty(opts)) {
            options = _.merge(options, removeObjectEmpty(opts)); // remove null, undefined
        }
        return this.http.post(this.makeUrl(url), removeObjectEmpty(params), options).toPromise();
    }

    public obGet(url: string, params?: object): Observable<any> {
        let httpParams = new HttpParams();
        if (params) {
            params = removeObjectEmptyValue(params); // remove null, undefined, empty string
            // tslint:disable-next-line: forin
            for (const key in params) {
                httpParams = httpParams.set(key, params[key]);
            }
        }
        return this.http.get(this.makeUrl(url), { params: httpParams });
    }

    public obPost(url: string, params?: any, opts?: object): Observable<any> {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
        if (!_.isEmpty(opts)) {
            options = _.merge(options, removeObjectEmpty(opts)); // remove null, undefined
        }
        return this.http.post(this.makeUrl(url), removeObjectEmpty(params), options);
    }
}
