import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/api';

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
    this.toggle = !this.toggle;
  }

}
