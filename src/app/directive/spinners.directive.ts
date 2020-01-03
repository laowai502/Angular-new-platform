import { Directive, ElementRef, Input, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[mySpinners]'
})
export class SpinnersDirective implements OnInit, OnDestroy {

    @Input()
    set mySpinners(val: boolean) {
        console.log(val);
        if (val) {
            this.showSpinners();
        } else {
            this.removeSpinners();
        }
    }

    spinner: any;
    displayVal: string;

    constructor(private el: ElementRef, private render: Renderer2) {
        this.spinner = this.render.createElement('i');
        this.spinner.className = 'pi pi-spin pi-spinner';
        this.displayVal = el.nativeElement.style.display;
    }

    ngOnInit() {
        // this.spinner = this.render.createElement('i');
        // this.spinner.className = 'pi pi-spin pi-spinner';
    }

    ngOnDestroy() {
        this.spinner = null;
    }

    protected showSpinners(): void {
        const parentNode = this.render.parentNode(this.el.nativeElement);
        this.render.insertBefore(parentNode, this.spinner, this.el.nativeElement);
        this.render.setStyle(this.el.nativeElement, 'display', 'none');
        // this.render.removeChild(parentNode.nativeElement, this.el.nativeElement, true);
    }
    protected removeSpinners(): void {
        console.dir(this.spinner);
        const parentNode = this.render.parentNode(this.el.nativeElement);
        this.render.removeChild(parentNode, this.spinner);
        this.render.setStyle(this.el.nativeElement, 'display', this.displayVal);
    }
}
