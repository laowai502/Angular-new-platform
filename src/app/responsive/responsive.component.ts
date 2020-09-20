import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
    selector: 'app-responsive',
    templateUrl: './responsive.component.html',
    styleUrls: ['./responsive.component.scss']
})
export class ResponsiveComponent implements OnInit {

    date: Date;
    fixTop = false;
    echartsIntance: any;
    showResSidebar = false;

    options = {
        title: {
            text: 'ngx-echarts-demo',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
            axisLabel: {
                inside: true,
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    color: 'rgba(0,0,0,0.05)'
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    color: '#827af3'
                },
                emphasis: {
                    itemStyle: {}
                },
                data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
            }
        ]
    };

    @HostListener('window:scroll', ['$event']) public onScroll = _.debounce(this.dealScroll, 50);

    @HostListener('window:resize', ['$event']) public onResize = _.debounce(this.dealResize, 50);

    dealScroll() {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= 50) {
            this.fixTop = true;
        } else {
            this.fixTop = false;
        }
    }

    dealResize() {
        const cw = document.documentElement.clientWidth;
        if (cw < 1300) {
            this.showResSidebar = false;
        }
    }

    constructor(private router: Router) { }

    ngOnInit() { }

    onChartInit(ec) {
        this.echartsIntance = ec;
    }

}
