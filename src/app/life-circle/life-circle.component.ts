import {
    Component,
    OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked,
    AfterContentInit, AfterContentChecked, OnDestroy, SimpleChanges

} from '@angular/core';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
    selector: 'app-life-circle',
    templateUrl: './life-circle.component.html',
    styleUrls: ['./life-circle.component.scss']
})
export class LifeCircleComponent implements OnInit {

    title = 'life circle test';

    public flag = true;

    constructor() { }

    ngOnInit() { }


    changeTilte() {
        this.title = 'title has been changed';
    }

    changeFlag() {
        this.flag = !this.flag;
    }


}
