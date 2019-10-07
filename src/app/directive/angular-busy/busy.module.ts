/**
 * rewritten from angular2-busy  github:https://github.com/devyumao/angular2-busy
 * @description A dynamic loading component with Anuglar
 * @author laowai
 */
import { NgModule, Compiler, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { JitCompilerFactory } from '@angular/compiler';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { BusyConfig } from './busy.config';

import { BusyDirective } from './busy.directive';
import { BusyService } from './busy.service';
import { BusyComponent } from './busy.component';
import { BusyBackdropComponent } from './busy-backdrop.component';

// use JitCompiler when workground with AoT
export function createJitCompiler() {
    // return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
    return new JitCompilerFactory().createCompiler([{ useJit: true }]);
}

@NgModule({
    imports: [CommonModule],
    declarations: [
        BusyDirective,
        BusyComponent,
        BusyBackdropComponent
    ],
    providers: [
        BusyService,
        { provide: Compiler, useFactory: createJitCompiler }
    ],
    exports: [BusyDirective],
    entryComponents: [
        BusyComponent,
        BusyBackdropComponent
    ]
})
export class BusyModule {
    static forRoot(config: BusyConfig): ModuleWithProviders {
        return {
            ngModule: BusyModule,
            providers: [
                { provide: BusyConfig, useValue: config }
            ]
        };
    }
}
