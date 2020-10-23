import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-ruler',
    templateUrl: './ruler.html',
    styleUrls: ['./ruler.scss']
})
export class RulerComponent implements OnInit {

    @Input() areaWidth: number;

    rulerX: Array<number> = [];
    rulerY: Array<number> = [];

    constructor() {}

    ngOnInit() {
        const x: Array<number> = [];
        const y = [];
        for (let i = 0; i < 200; i++) {
            x.push(i);
        }
        for (let i = 0; i < 200; i++) {
            y.push(i);
        }
        this.rulerX = x;
        this.rulerY = y;
    }

}
