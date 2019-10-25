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

    public appendToBody(): void {
        const componentFactory = this.cfr.resolveComponentFactory(DynamicTestComponent);
        const componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);
    }
}


// https://malcoded.com/posts/angular-dynamic-components/
// https://www.cnblogs.com/artimis/p/9025238.html