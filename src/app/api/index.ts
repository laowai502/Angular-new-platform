import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EventEmitter } from '@angular/core';

import { RequestService } from 'src/app/common/http/request.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService extends RequestService {

    constructor(http: HttpClient) {
        super(http);
        console.log('have been instance');
    }

    public middleApiList(): Promise<any> {
        return this.get('/getTestList');
    }

}
