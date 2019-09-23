import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-test-char-one',
    template: `
        <div class="p16">
            <button pButton type="button" class="mr12" (click)="isLoading = !isLoading" label="Toggle Loading"></button>
            <button pButton type="button" class="mr12" (click)="setOption()" label="Merge Option"></button>
            <button pButton type="button" (click)="reset()" label="Reset"></button>
            <echarts [options]="options" [loading]="isLoading" [merge]="mergeOption" [autoResize]="true" class="charts-layout"></echarts>
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
        `
    ]
})
export class CharOne implements OnInit {

    isLoading = false;

    mergeOption: any;

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
            data: ['X-1', 'X-2', 'X-3']
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
        series: []
    };

    constructor() {}

    ngOnInit() {
        this.reset();
    }

    setSeriesData(param: any) {
        const data = [{
            name: 'X-1',
            type: 'line',
            stack: 'counts',
            areaStyle: { normal: {} },
            data: []
        },
        {
            name: 'X-2',
            type: 'line',
            stack: 'counts',
            areaStyle: { normal: {} },
            data: []
        },
        {
            name: 'X-3',
            type: 'line',
            stack: 'counts',
            areaStyle: { normal: {} },
            data: []
        }];
        data.forEach((e, i) => {
            e.data = param[i];
        });
        return data;
    }

    reset() {
        const array = [
            [50, 132, 101, 134, 90, 230, 100],
            [220, 182, 191, 234, 290, 330, 310],
            [150, 232, 201, 154, 190, 330, 210]
        ];
        this.mergeOption = {
            series: this.setSeriesData(array)
        };
    }

    setOption() {
        const array = [
            [100, 132, 101, 134, 80, 230, 100],
            [220, 182, 191, 234, 320, 330, 310],
            [10, 232, 201, 154, 190, 330, 1000]
        ];
        this.mergeOption = {
            series: this.setSeriesData(array)
        };
    }

}
