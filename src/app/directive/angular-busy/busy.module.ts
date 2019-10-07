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

// use JitCompiler when workground with AoT
export function createJitCompiler() {
    // return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
    return new JitCompilerFactory().createCompiler([{ useJit: true }]);
}

@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [],
    exports: [],
    entryComponents: []
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
