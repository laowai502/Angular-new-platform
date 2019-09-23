import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'about-one-one',
    templateUrl: './about_one_one.html',
    styleUrls: []
})
// tslint:disable-next-line: class-name
export class About_One_Child implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {}

    back() {
        this.router.navigate(['/pages/about/about_one', '1']);
    }

}
