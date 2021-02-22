import { NgModule } from '@angular/core';

import { SpinnersDirective } from './spinners.directive';
import { DragScrollingDirective } from './drag-scrolling.directive';

@NgModule({
    declarations: [SpinnersDirective, DragScrollingDirective],
    exports: [SpinnersDirective, DragScrollingDirective],
    imports: []
})
export class DirectiveModule {}
