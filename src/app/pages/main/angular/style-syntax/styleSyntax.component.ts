import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/api';

import * as Highcharts from 'highcharts';

import * as _ from 'lodash';

import * as SummaryModel from './cip-summary.model';

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

    Highcharts = Highcharts; // 必填

    ratingChartOption: SummaryModel.ChartOption = new SummaryModel.ChartOption();

    chartOptions = {};

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.chartOptions = this.getOptions();
        console.log(this.ratingChartOption);
        this.ratingChartOption.series[0].data = [
            {
                id: 1,
                name: 'aaa',
                y: 50,
                color: '#FFD700',
                rowData: {}
            }
        ];
        this.ratingChartOption.series[0].events.click = this.test.bind(this);
    }

    ChangeWidth() {
        this.width = this.width === 500 ? 800 : 500;
        this.height = this.height === 120 ? 200 : 120;
    }

    getOptions() {
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: '2018 年浏览器市场份额'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: []
            }]
        };
    }

    test() {
        console.log(1);
        console.log(this.onlyClass);
    }

}
