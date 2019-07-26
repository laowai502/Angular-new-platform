import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'app-cmt-child',
	templateUrl: './child.component.html'
})
export class ChildComponent implements OnInit, OnChanges {

	@Input() data: any; // 接收父组件的值

	ngOnInit() {
		console.log(this.data);
	}

	ngOnChanges() {
		console.log(this.data);
	}

}
