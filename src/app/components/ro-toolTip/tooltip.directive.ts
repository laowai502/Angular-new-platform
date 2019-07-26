/* tslint:disable: max-file-line-count deprecation */
import {
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    TemplateRef,
    ViewContainerRef
  } from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipConfig } from './tooltip.config';

import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { OnChange, warnOnce, parseTriggers } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';

import { timer } from 'rxjs';

let id = 0;

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[tooltip], [tooltipHtml]',
    exportAs: 'bs-tooltip'
})
export class TooltipDirective implements OnInit, OnDestroy {
    tooltipId = id++;
    /** sets disable adaptive position */
    @Input() adaptivePosition: boolean;
    /**
     * Content to be displayed as tooltip.
     */
    @OnChange()
    @Input()
    /* tslint:disable-next-line:no-any */
    tooltip: string | TemplateRef<any>;
    /** Fired when tooltip content changes */
    @Output()
    /* tslint:disable-next-line:no-any */
    tooltipChange: EventEmitter<string | TemplateRef<any>> = new EventEmitter();

    /**
     * Placement of a tooltip. Accepts: "top", "bottom", "left", "right"
     */
    @Input() placement: string;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    @Input() triggers: string;
    /**
     * A selector specifying the element the tooltip should be appended to.
     */
    @Input() container: string;
    /**
     * Css class for tooltip container
     */
    @Input() containerClass = '';
    /**
     * Returns whether or not the tooltip is currently being shown
     */
    @Input()
    get isOpen(): boolean {
        return this._tooltip.isShown;
    }

    set isOpen(value: boolean) {
        if (value) {
        this.show();
        } else {
        this.hide();
        }
    }

    /**
     * Allows to disable tooltip
     */
    @Input() isDisabled: boolean;

    /**
     * Delay before showing the tooltip
     */
    @Input() delay: number;

    /**
     * Emits an event when the tooltip is shown
     */
    /* tslint:disable-next-line:no-any */
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onShown: EventEmitter<any>;
    /**
     * Emits an event when the tooltip is hidden
     */
    /* tslint:disable-next-line:no-any */
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onHidden: EventEmitter<any>;

    /** @deprecated - please use `tooltip` instead */
    @Input('tooltipHtml')
    /* tslint:disable-next-line:no-any */
    set htmlContent(value: string | TemplateRef<any>) {
        warnOnce('tooltipHtml was deprecated, please use `tooltip` instead');
        this.tooltip = value;
    }

    /** @deprecated - please use `placement` instead */
    @Input('tooltipPlacement')
    set _placement(value: string) {
        warnOnce('tooltipPlacement was deprecated, please use `placement` instead');
        this.placement = value;
    }

    /** @deprecated - please use `isOpen` instead */
    @Input('tooltipIsOpen')
    set _isOpen(value: boolean) {
        warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
        this.isOpen = value;
    }

    get _isOpen(): boolean {
        warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');

        return this.isOpen;
    }

    /** @deprecated - please use `isDisabled` instead */
    @Input('tooltipEnable')
    set _enable(value: boolean) {
        warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
        this.isDisabled = !value;
    }

    get _enable(): boolean {
        warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');

        return this.isDisabled;
    }

    /** @deprecated - please use `container="body"` instead */
    @Input('tooltipAppendToBody')
    set _appendToBody(value: boolean) {
        warnOnce(
        'tooltipAppendToBody was deprecated, please use `container="body"` instead'
        );
        this.container = value ? 'body' : this.container;
    }

    get _appendToBody(): boolean {
        warnOnce(
        'tooltipAppendToBody was deprecated, please use `container="body"` instead'
        );

        return this.container === 'body';
    }

    /** @deprecated - removed, will be added to configuration */
    @Input() tooltipAnimation = true;

    /** @deprecated - will replaced with customClass */
    @Input('tooltipClass')
    set _popupClass(value: string) {
        warnOnce('tooltipClass deprecated');
    }

    /** @deprecated - removed */
    @Input('tooltipContext')
    /* tslint:disable-next-line:no-any */
    set _tooltipContext(value: any) {
        warnOnce('tooltipContext deprecated');
    }

    /** @deprecated */
    @Input('tooltipPopupDelay')
    set _tooltipPopupDelay(value: number) {
        warnOnce('tooltipPopupDelay is deprecated, use `delay` instead');
        this.delay = value;
    }

    /** @deprecated */
    @Input() tooltipFadeDuration = 150;

    /** @deprecated -  please use `triggers` instead */
    @Input('tooltipTrigger')
    get _tooltipTrigger(): string | string[] {
        warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');

        return this.triggers;
    }

    set _tooltipTrigger(value: string | string[]) {
        warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
        this.triggers = (value || '').toString();
    }

    @HostBinding('attr.aria-describedby') ariaDescribedby = `tooltip-${this.tooltipId}`;

    /** @deprecated */
    @Output()
    tooltipStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    /* tslint:disable-next-line:no-any */
    // tslint:disable-next-line: variable-name
    protected _delayTimeoutId: number | any;
    // tslint:disable-next-line: ban-types variable-name
    protected _tooltipCancelShowFn: Function;

    // tslint:disable-next-line: variable-name
    private _tooltip: ComponentLoader<TooltipContainerComponent>;
    constructor(
        // tslint:disable-next-line: variable-name
        _viewContainerRef: ViewContainerRef,
        cis: ComponentLoaderFactory,
        config: TooltipConfig,
        // tslint:disable-next-line: variable-name
        private _elementRef: ElementRef,
        // tslint:disable-next-line: variable-name
        private _renderer: Renderer2,
        // tslint:disable-next-line: variable-name
        private _positionService: PositioningService
    ) {

        this._tooltip = cis
        .createLoader<TooltipContainerComponent>(
            this._elementRef,
            _viewContainerRef,
            this._renderer
        )
        .provide({provide: TooltipConfig, useValue: config});

        Object.assign(this, config);
        this.onShown = this._tooltip.onShown;
        this.onHidden = this._tooltip.onHidden;
    }

    ngOnInit(): void {
        this._tooltip.listen({
        triggers: this.triggers,
        show: () => this.show()
        });
        /* tslint:disable-next-line:no-any */
        this.tooltipChange.subscribe((value: any) => {
        if (!value) {
            this._tooltip.hide();
        }
        });
    }

    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    toggle(): void {
        if (this.isOpen) {
        return this.hide();
        }

        this.show();
    }

    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    show(): void {
        this._positionService.setOptions({
        modifiers: {
            flip: {
            enabled: this.adaptivePosition
            },
            preventOverflow: {
            enabled: this.adaptivePosition
            }
        }
        });

        if (
        this.isOpen ||
        this.isDisabled ||
        this._delayTimeoutId ||
        !this.tooltip
        ) {
        return;
        }

        const showTooltip = () => {
        if (this._delayTimeoutId) {
            this._delayTimeoutId = undefined;
        }

        this._tooltip
            .attach(TooltipContainerComponent)
            .to(this.container)
            .position({attachment: this.placement})
            .show({
            content: this.tooltip,
            placement: this.placement,
            containerClass: this.containerClass,
            id: this.ariaDescribedby
            });
        };
        const cancelDelayedTooltipShowing = () => {
            if (this._tooltipCancelShowFn) {
                this._tooltipCancelShowFn();
            }
        };

        if (this.delay) {
        // tslint:disable-next-line: variable-name
        const _timer = timer(this.delay).subscribe(() => {
            showTooltip();
            cancelDelayedTooltipShowing();
        });

        if (this.triggers) {
            const triggers = parseTriggers(this.triggers);
            this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, triggers[0].close, () => {
            _timer.unsubscribe();
            cancelDelayedTooltipShowing();
            });
        }
        } else {
        showTooltip();
        }
    }

    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    hide(): void {
        if (this._delayTimeoutId) {
        clearTimeout(this._delayTimeoutId);
        this._delayTimeoutId = undefined;
        }

        if (!this._tooltip.isShown) {
        return;
        }

        this._tooltip.instance.classMap.in = false;
        setTimeout(() => {
        this._tooltip.hide();
        }, this.tooltipFadeDuration);
    }

    ngOnDestroy(): void {
        this._tooltip.dispose();
    }
}
