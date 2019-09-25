import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ngx-echarts',
    templateUrl: './ngx-echarts.component.html',
    styleUrls: []
})
export class NgxEchartsComponent implements OnInit {

    width = '100%';

    constructor() {}

    ngOnInit() {}

    changeWidth() {
        this.width = this.width === '100%' ? '90%' : '100%';
    }

}
