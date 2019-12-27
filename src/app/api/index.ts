import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestService } from 'src/app/common/http/request.service';


@Injectable()
export class ApiService extends RequestService {

    constructor(http: HttpClient) {
        super(http);
    }

    public getSearchList(): Promise<any> {
        return this.get('/assets/mockApi/search.json');
        // return this.get('/api/xxx/search');
    }

    public getSearchDetail(id: string): Promise<any> {
        return this.get('/assets/mockApi/detail.json');
        // return this.get('/api/xxx/getSearchDetail', { id });
    }

    public addComment(obj): Promise<any> {
        return this.post('/api/xxx/addComment');
    }

}
