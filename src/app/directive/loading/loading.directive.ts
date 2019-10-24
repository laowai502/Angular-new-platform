import { Directive, Input, DoCheck, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'MyLoading'
})
export class MyLoadingDirective implements DoCheck {

    constructor() {}

    ngDoCheck(): void {}

}