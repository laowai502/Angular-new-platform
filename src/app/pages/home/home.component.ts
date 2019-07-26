import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  test = {
    a: 1
  };
  b = null;

  constructor() { }

  ngOnInit() {
    console.info(111111);
  }

  clickTest() {
    this.b = this.test;
    this.b.a = 2;
    console.info(this.test);
    console.info(this.b);
  }

}
