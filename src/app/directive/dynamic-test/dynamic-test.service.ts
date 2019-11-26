import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';

import { DynamicTestModule } from './dynamic-test.module';
import { DynamicTestComponent } from './dynamic-test.component';

@Injectable({
    providedIn: DynamicTestModule
})
export class DynamicTestService {

    DC: ComponentRef<DynamicTestComponent>;

    constructor(
        private cfr: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    private appendToBody() {
        const componentFactory = this.cfr.resolveComponentFactory(DynamicTestComponent);
        const componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.DC = componentRef;
    }

    private removeFromBody() {
        this.appRef.detachView(this.DC.hostView);
        this.DC.destroy();
    }

    public open() {
        this.appendToBody();
    }
}


// https://malcoded.com/posts/angular-dynamic-components/
// https://www.cnblogs.com/artimis/p/9025238.html