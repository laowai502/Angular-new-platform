import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestService } from 'src/app/common/http/request.service';


@Injectable()
export class FlowService extends RequestService {

    constructor(http: HttpClient) {
        super(http);
    }

    public getSelectedStepData(id: number): Promise<any> {
        return this.get('/api/xxx/getById', { id });
    }

    public updateFlowStepData(obj: any): Promise<any> {
        return this.post('/api/xxx/update', obj);
    }

    public addStep(obj: any): Promise<any> {
        return this.post('/api/xxx/insert', obj);
    }

    public deleteStep(id: string): Promise<any> {
        return this.post('/api/xxx/delete', null, { params: { paramId: id } });
    }

}
