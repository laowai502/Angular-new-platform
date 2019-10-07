import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-angular-busy',
    templateUrl: './angular-busy.component.html',
    styleUrls: ['./angular-busy.component.scss']
})
export class AngularBusyComponent implements OnInit {

    busy: Promise<any>;

    constructor(private http: HttpClient) {}

    ngOnInit() {}

    play() {
        this.busy = this.http.get('https://httpbin.org/delay/1').toPromise();
    }

}
