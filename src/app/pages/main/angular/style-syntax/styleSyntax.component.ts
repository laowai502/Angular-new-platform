import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/api';

import * as _ from 'lodash';

@Component({
  selector: 'app-style-syntax',
  templateUrl: './styleSyntax.component.html',
  styleUrls: ['./styleSyntax.component.scss', '../../../../themes/markdown.scss']
})
// tslint:disable-next-line: class-name
export class StyleSyntaxComponent implements OnInit {

  md = `
      \`\`\`javascript
          //bad
          <div [ngStyle]="{'margin-left':cardMarginLeft}">
          //ts
          this.cardMarginLeft = (parseInt(margin[0]) + 10) + "px";

          //goods
          <div [style.marginLeft.px]="cardMarginLeft"> // html
          this.cardMarginLeft = parseInt('20') + 10; // ts
      \`\`\`
  `;

  md1 = `
      \`\`\`javascript
        // bad
        // html
        <div [ngClass]="{'class-b': type!='a', 'class-a':type=='a'}">

        // scss
        .class-a {
          width: 145px;
          height:30px;
          background-color: #2e6efc;
          text-align: center;
          color: $white-color;
          font-size: 14px;
          font-family: 'Graphik Regular';
        }
        .class-b {
          width: 125px;
          height:30px;
          background-color: #F89418;
          text-align: center;
          color: $white-color;
          font-size: 14px;
          font-family: 'Graphik Regular';
        }

        //good
        <div class="base-class" [class.class-b]="type == 'b'">
        .base-class {
            ...
            &.class-b {
                width: 125px;
                height:30px;
                background-color: #F89418;
            }
        }
      \`\`\`
  `;

  width = 500;
  height = 120;

  onlyClass = 'only-class';
  newClasee = true;

  isActive = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  ChangeWidth() {
    this.width = this.width === 500 ? 800 : 500;
<<<<<<< HEAD:src/app/pages/main/angular/style-syntax/styleSyntax.component.ts
    this.height = this.height === 120 ? 200 : 120;
=======
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
>>>>>>> refs/remotes/origin/dev:src/app/pages/main/angular/httpTest/httpTest.component.ts
  }

}
