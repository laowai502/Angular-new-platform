import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  data: any = 'string';
  inputValue: string;
  myDestory: any;

  public testTemplete: string;

  isShow = 'show';

  constructor(
    private router: Router
  ) {
    this.myDestory = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isShow = event.url.indexOf('about_one') !== -1 ? 'hidden' : 'show';
    });
  }

  ngOnInit() {
    this.testTemplete = 'No build';
  }

  ngOnDestroy() {
      this.myDestory.unsubscribe();
  }

  toChild() {
    this.router.navigate(['/pages/about/about_one', '1']);
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

}
