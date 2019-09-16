import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    md = `
        ### laowai
    `;

    str = '123123132';
    // str = '123<br>123<br>132';

    constructor() {
        this.str = this.str.replace(/<br>/g, '\n');
    }

    ngOnInit() {}

}
