import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestService } from 'src/app/common/http/request.service';


@Injectable({
    providedIn: 'root'
})
export class ApiService extends RequestService {

    constructor(http: HttpClient) {
        super(http);
    }

    public middleApiList(): Promise<any> {
        return this.get('/getTestList');
    }

}
