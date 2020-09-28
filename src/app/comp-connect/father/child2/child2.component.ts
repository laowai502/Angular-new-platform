import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { CompConnectService } from '../../comp-connect.service';

@Component({
    selector: 'app-child2',
    templateUrl: './child2.component.html',
    styleUrls: ['./child2.component.scss']
})
export class Child2Component implements OnInit {

    @Input() fTxt: string;
    @Input() fCount: string;

    @Input() fComponent: any;

    @Input() fFn: any;

    @Output() recallChild2 = new EventEmitter<string>();

    normalTxt: string;

    connectTxt = '';
    conectCount = 1;

    constructor(private cnSercice: CompConnectService) {}

    get dynamicTxt() {
        return this.cnSercice.dynamicData;
    }
    set dynamicTxt(val: string) {
        this.cnSercice.dynamicData = val;
    }

    ngOnInit() {
        this.cnSercice.compToComp.subscribe((data: string) => {
            this.connectTxt = data;
            console.log('child2:' + data);
        });
    }

    ngOnDestroy() {
        
    }

    getTxtByService() {
        this.normalTxt = this.cnSercice.getData();
    }

    setTxtByService() {
        this.cnSercice.setData(this.normalTxt);
    }

    connect() {
        this.cnSercice.compToComp.emit('The msg from child2 ！！！');
    }

}
