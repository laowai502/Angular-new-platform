import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipConfig } from './tooltip.config';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

@NgModule({
    imports: [CommonModule],
    declarations: [TooltipDirective, TooltipContainerComponent],
    exports: [TooltipDirective],
    entryComponents: [TooltipContainerComponent]
})
export class ROTooltipModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ROTooltipModule,
            providers: [TooltipConfig, ComponentLoaderFactory, PositioningService]
        };
    }
}
