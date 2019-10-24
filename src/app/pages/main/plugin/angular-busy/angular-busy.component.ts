import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-angular-busy',
    templateUrl: './angular-busy.component.html',
    styleUrls: ['./angular-busy.component.scss']
})
export class AngularBusyComponent implements OnInit {

    loading = false;

    constructor() {}

    ngOnInit() {}

}
