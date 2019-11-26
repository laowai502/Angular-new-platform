import { Component, OnInit, OnDestroy, AfterViewInit, ComponentRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-dynamic-test',
    template: `
        <div class="overlay">
            <div class="dialog"></div>
        </div>
    `,
    styles: [
        `
            .overlay {
                display: flex;
                flex-direction: column;
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.7);
                align-items: center;
                justify-content: center;
            }
            .dialog {
                box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
                background-color: white;
                width: 50%;
                height: 50%;
                display: flex;
                flex-direction: column;
                padding: 8px;
            }
        `
    ]
})
export class DynamicTestComponent implements OnDestroy, AfterViewInit {

    componentRef: ComponentRef<any>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    onOverlayClicked(evt: MouseEvent) {
        // this.dialogRef.close();
    }

    onDialogClicked(evt: MouseEvent) {
        evt.stopPropagation();
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

    close() {}

}
