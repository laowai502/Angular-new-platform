import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-responsive-table',
    templateUrl: './table.component.html',
    styleUrls: []
})
export class ResTableComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() { }

}
