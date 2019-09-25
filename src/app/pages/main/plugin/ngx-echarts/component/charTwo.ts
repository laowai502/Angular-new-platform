import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-test-char-two',
    template: `
        <div class="p16">
            <h5 class="title">It sames like "setOption(newOptions, true)"</h5>
            <button pButton type="button" class="mr12" (click)="setOption()" label="Merge Option"></button>
            <button pButton type="button" (click)="reset()" label="Reset"></button>
            <echarts [options]="options" (chartInit)="onChartInit($event)" [autoResize]="true" class="charts-layout"></echarts>
        </div>
    `,
    styles: [
        `
            .charts-layout {
                display: block;
                padding: 16px;
                width: 100%;
                height: 350px;
            }
            .title {
                border-left: solid 3px #FF0000;
                padding-left: 16px;
                margin-bottom: 24px;
            }
        `
    ]
})
export class CharTwo implements OnInit {

    echartsIntance: any;
    newOption: any;

    options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['X-1', 'X-2', 'X-3', 'X-4', 'X-5']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'X-1',
                type: 'line',
                stack: 'counts',
                areaStyle: { normal: {} },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'X-2',
                type: 'line',
                stack: 'counts',
                areaStyle: { normal: {} },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'X-3',
                type: 'line',
                stack: 'counts',
                areaStyle: { normal: {} },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'X-4',
                type: 'line',
                stack: 'counts',
                areaStyle: { normal: {} },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'X-5',
                type: 'line',
                stack: 'counts',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: { normal: {} },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    constructor() {}

    ngOnInit() {
        // this.reset();
    }

    reset() {
        this.echartsIntance.setOption(this.options, true);
    }

    setOption() {
        this.newOption = _.cloneDeep(this.options);
        this.newOption.series = this.newOption.series.slice(2);
        this.echartsIntance.setOption(this.newOption, true);
    }

    onChartInit(ec) {
        this.echartsIntance = ec;
    }

}
