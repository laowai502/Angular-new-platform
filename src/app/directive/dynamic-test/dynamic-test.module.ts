import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTestComponent } from './dynamic-test.component';
// import { DialogComponent } from './dialog.component';
// import { InsertionDirective } from './insertion.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        // InsertionDirective
        DynamicTestComponent
    ],
    entryComponents: [
        DynamicTestComponent
    ]
})
export class DynamicTestModule {}
