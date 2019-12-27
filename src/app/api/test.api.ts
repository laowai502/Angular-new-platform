import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestService } from 'src/app/common/http/request.service';


@Injectable()
export class FlowService extends RequestService {

    constructor(http: HttpClient) {
        super(http);
    }
}
