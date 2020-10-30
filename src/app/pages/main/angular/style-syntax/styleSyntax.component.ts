import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/common/auth.service';

import { ApiService } from 'src/app/api';

@Component({
    selector: 'app-style-syntax',
    templateUrl: './styleSyntax.component.html',
    styleUrls: ['./styleSyntax.component.scss', '../../../../themes/markdown.scss'],
    providers: [ApiService, AuthService]
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

    constructor(public auth: AuthService, private apiService: ApiService) { }

    ngOnInit() {}

    ChangeWidth() {
        this.width = this.width === 500 ? 800 : 500;
        this.height = this.height === 120 ? 200 : 120;
    }

    getList() {
        this.apiService.middleApiList().then(res => {
            console.log(res.data);
        });
    }

}
