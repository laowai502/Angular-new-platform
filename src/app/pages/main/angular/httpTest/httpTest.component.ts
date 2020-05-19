import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/api';

import * as _ from 'lodash';

@Component({
  selector: 'app-http-test',
  templateUrl: './httpTest.component.html',
  styleUrls: ['./httpTest.component.scss', '../../../../themes/markdown.scss']
})
// tslint:disable-next-line: class-name
export class HttpTestComponent implements OnInit {

  md = `
      \`\`\`javascript
          //html bad
          <div [ngStyle]="{'margin-left':cardMarginLeft}">
          //ts
          this.cardMarginLeft = (parseInt(margin[0]) + 10) + "px";

          //good
          <div [style.marginLeft.px]="cardMarginLeft"> // html
          this.cardMarginLeft = parseInt(margin[0]) + 10; // ts
      \`\`\`
  `;

  md1 = `
      \`\`\`javascript
        // html
        <div [ngClass]="{'ecatt-search-progprietaty':item.ProprietaryOrVendor!='Vendor','ecatt-search-vendor':item.ProprietaryOrVendor=='Vendor'}">

        // scss
        .ecatt-search-progprietaty {
          width: 145px;
          height:30px;
          background-color: #2e6efc;
          text-align: center;
          color: $white-color;
          font-size: 14px;
          font-family: 'Graphik Regular';
        }
        .ecatt-search-vendor {
          width: 125px;
          height:30px;
          background-color: #F89418;
          text-align: center;
          color: $white-color;
          font-size: 14px;
          font-family: 'Graphik Regular';
        }

        <div class="base-class" [class.ecatt-search-vendor]="item.ProprietaryOrVendor == 'Vendor'">
        .ecatt-search-progprietaty {
            ...
            &.ecatt-search-vendor {
                width: 125px;
                height:30px;
                background-color: #F89418;
            }
        }
      \`\`\`
  `;

  width = 500;

  onlyClass = 'only-class';
  newClasee = true;

  isActive = true;

  toggle = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  ChangeWidth() {
    this.width = this.width === 500 ? 800 : 500;
  }

  test() {
    // this.toggle = !this.toggle;
    const arr = [
        { key: '5D002.c.1', value: '1' },
        { key: 'EAR99', value: '1' },
        { key: '3A992', value: '1' },
        { key: 'TBD', value: '1' },
        { key: '5D002', value: '1' },
        { key: '3A991.b.1.a', value: '1' },
        { key: '5A002', value: '1' },
        { key: '5D992.c', value: '2'},
        { key: 'Decontrolled', value: '2'},
        { key: '5A002.a.3', value: '2'}
    ];
    console.log(_.sortBy(arr, e => e.key));
    // console.log(arr);
  }

}
