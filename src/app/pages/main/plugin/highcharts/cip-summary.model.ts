export class ChartOption {
    chart: Object;
    legend: Object;
    title: {
        text: string,
        useHTML: boolean,
        x: number,
        y: number,
        verticalAlign: string
    };
    tooltip: Object;
    plotOptions: {
        pie: {
            allowPointSelect: boolean,
            cursor: string,
            showInLegend: boolean,
            dataLabels: Object,
            states: {
                hover: {
                    enabled: boolean
                },
                inactive: {
                    opacity: number
                }
            }
        }
    };
    colors: string[];
    series: [{
        size: string,
        innerSize: string,
        center: [string, string],
        borderWidth: number,
        // tslint:disable-next-line: ban-types
        name: String,
        colorByPoint: boolean,
        data: ChartSeriesData[],
        events: {
            click: any
        }
    }];

    constructor() {
        this.chart = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 350,
            width: 450,
        };
        this.legend = {
            enabled: true,
            lineHeight: 30,
            maxHeight: 80,
            itemWidth: 250,
            itemDistance: 20,
            width: 450,
            align: 'bottom',
            squareSymbol: false,
            symbolHeight: 15,
            symbolPadding: 10,
            symbolRadius: 0,
            symbolWidth: 30
        };
        this.title = {
            text: '<div class="pie-chart-title">Total</br> <b>0</b> risks</div>',
            useHTML: true,
            x: 5,
            y: -45,
            verticalAlign: 'middle'
        };
        this.tooltip = {
            enabled: false
        };
        this.plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: false,
                dataLabels: {
                    enabled: true,
                    format: '<div class="pie-chart-label"><span>{point.name}</span></br><b>{point.y}</b> <span>risks</span></div>',
                    useHTML: true,
                    distance: 40,
                    softConnector: true,
                    verticalAlign: 'top'
                },
                states: {
                    hover: {
                        enabled: true
                    },
                    inactive: {
                        opacity: 1
                    }
                }
            }
        };
        this.series = [{
            size: '50%',
            innerSize: '55%',
            center: ['200', '35%'],
            borderWidth: null,
            name: 'Brands',
            colorByPoint: true,
            data: [],
            events: {
                click: null
            }
        }];
    }

    setTotalNum(num: number) {
        this.title.text = '<div class="pie-chart-title">Total</br> <b>' + num + '</b> risks</div>';
    }

    setData(data: ChartSeriesData[]) {
        this.series[0].data = data;
    }
}

export class CategoryChartOption extends ChartOption {
    constructor() {
        super();
        this.plotOptions.pie.allowPointSelect = true;
        this.plotOptions.pie.cursor = 'pointer';
        this.tooltip = {
            enabled: true,
            formatter () {
                return '<div class="pie-chart-toolip-wrap">'
                    + '<div class="title">' + this.point.name + '</br> <b>' + this.point.y + '</b> risks</div>'
                    + '<table>'
                    + '<tr><td class="lable">' + 'High Risks' + '</td><td><b>' + this.point.rowData.A + '</b></td></tr>'
                    + '<tr><td class="lable">' + 'Above Normal Risks' + '</td><td><b>' + this.point.rowData.B + '</b></td></tr>'
                    + '<tr class="grey"><td class="lable">' + 'Normal Risks Mitigated' + '</td><td><b>' + this.point.rowData.C + '</b></td></tr>'
                    + '<tr class="grey"><td class="lable">' + 'Normal Risks' + '</td><td><b>' + this.point.rowData.D + '</b></td></tr>'
                    + '</table>'
                    + '</div>';
            },
            useHTML: true,
            backgroundColor: '#fff',
            borderWidth: 0,
            padding: 0,
            followTouchMove: false,
            followPointer: false,
            hideDelay: 0,
            borderRadius: 10
        };
    }
}

export class Risk {
    RiskId: number;
    CIPId: number;
    Level1Id: number;
    Level2Id: number;
    Level1Txt: string;
    Level2Txt: string;
    Level3Txt: string;
    RiskDescription: string;
    RiskMitigation: string;
    Comments: [{
        Comment: string;
        CommentsUserId: string;
        CommentsDttm: string;
        ClickShow: boolean;
    }];
    Feedbacks: [{
        ApproverType: string;
        ApproversFeedback: string;
        FeedbackUserId: string;
        FeedbackDttm: string;
        Status: string;
        ClickShow: boolean;
    }];
    RiskRatingId: number;
    RiskRatingDesc: string;
    RiskStatus: string;
    RiskRatingCodeTxt: string;
    SortComments: string;
    SortFeedback: string;
    RiskType: string;
    HasRevision: number;
    RiskAttachment: [{
        CIPRiskAttachmentsId: number;
        FileName: string;
        FilePath: string;
        CreateDttm: string;
        CreateUserId: string;
        RiskId: number;
    }];
}

export class ChartSeriesData {
    id: number;
    name: string;
    y: number;
    color: string;
    // tslint:disable-next-line: ban-types
    rowData: Object;
}

export class ChartBarModel {
    CategoryName: string;
    CategoryColor: string;
    TotalPercentage: number;
    RiskPercentage: number;
    TotalCount: number;
    RatingNormal: number;
    RatingAboveNormal: number;
    RatingHigh: number;
    RatingTotal?: number;
    Level1Id: number;
    Rating: string;
}

