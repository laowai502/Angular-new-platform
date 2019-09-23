import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'about-one',
    templateUrl: './about_one.html',
    styleUrls: []
})
export class AboutOne implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {}

    back() {
        this.router.navigate(['/pages/about']);
    }

    toChild() {
        this.router.navigate(['/pages/about/about_one/1/about_one_one', '1']);
    }
}
