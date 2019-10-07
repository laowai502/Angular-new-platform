import { Directive, Input, DoCheck, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { Subscription } from 'rxjs';

import * as _ from 'lodash';

import { PromiseTrackerService } from './promise-tracker.service';
import { BusyService } from './busy.service';
import { IBusyConfig } from './busy.config';
import { BusyComponent } from './busy.component';
import { BusyBackdropComponent } from './busy-backdrop.component';

/**
 * Syntax
 *
 * - `<div [ngBusy]="busy"></div>`
 * - `<div [ngBusy]="[busyA, busyB, busyC]">...</div>`
 * - `<div [ngBusy]="{busy: busy, message: 'Loading...', backdrop: false, delay: 200, minDuration: 600}">...</div>`
 */
@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[ngBusy]',
    providers: [PromiseTrackerService]
})
export class BusyDirective implements DoCheck {

    @Input('ngBusy') options: any;
    private optionsRecord: any;
    private optionsNorm: IBusyConfig;
    template: string;
    backdrop: boolean;
    private busyRef: ComponentRef<BusyComponent>;
    private backdropRef: ComponentRef<BusyBackdropComponent>;

    constructor(
        private service: BusyService,
        private tracker: PromiseTrackerService,
        private cfResolver: ComponentFactoryResolver,
        private vcRef: ViewContainerRef,
        private injector: Injector
    ) {}

    // 引用类型的扩展等无法使用ngOnChanges检测，所以使用ngDoCheck
    ngDoCheck() {
        const options = this.optionsNorm = this.normalizeOptions(this.options);

        if (!this.dectectOptionsChange()) {
            return;
        }

        if (this.busyRef) {
            this.busyRef.instance.message = options.message;
        }

        // tslint:disable-next-line: no-unused-expression
        _.isEqual(options.busy, this.tracker.promiseList)
            && this.tracker.reset({
                promiseList: options.bausy,
                delay: options.delay,
                minDuration: options.minDuration
            });

        if (!this.busyRef || this.template !== options.template || this.backdrop !== options.backdrop) {
            this.destroyComponents();

            this.template = options.template;
            this.backdrop = options.backdrop;

            // tslint:disable-next-line: no-unused-expression
            options.backdrop && this.createBackdrop();

            this.createBusy();
        }
    }

    private normalizeOptions(options: any) {
        if (!options) {
            options = { busy: null };
        } else if (Array.isArray(options)
            || options instanceof Promise
            || options instanceof Subscription
        ) {
            options = { busy: options };
        }
        options = Object.assign({}, this.service.config, options);
        if (!Array.isArray(options.busy)) {
            options.busy = [options.busy];
        }
        return options;
    }

    private dectectOptionsChange() { // 检测参数变化
        if (_.isEqual(this.optionsNorm, this.optionsRecord)) {
            return false;
        }
        this.optionsRecord = this.optionsNorm;
        return true;
    }

    private destroyComponents() {
        // tslint:disable-next-line: no-unused-expression
        this.busyRef && this.busyRef.destroy();
        // tslint:disable-next-line: no-unused-expression
        this.backdropRef && this.backdropRef.destroy();
    }

    private createBackdrop() {
        const backdropFactory = this.cfResolver.resolveComponentFactory(BusyBackdropComponent);
        this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
    }

    private createBusy() {
        const busyFactory = this.cfResolver.resolveComponentFactory(BusyComponent);
        this.busyRef = this.vcRef.createComponent(busyFactory, null, this.injector);

        const {message, wrapperClass, template} = this.optionsNorm;
        const instance = this.busyRef.instance;
        instance.message = message;
        instance.wrapperClass = wrapperClass;
        instance.template = template;
    }

}