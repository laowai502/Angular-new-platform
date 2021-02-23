import { NgModule } from '@angular/core';

import { SpinnersDirective } from './spinners.directive';
import { WorkareaDragScrolDirective } from './drag-scrolling.directive';

@NgModule({
    declarations: [SpinnersDirective, WorkareaDragScrolDirective],
    exports: [SpinnersDirective, WorkareaDragScrolDirective],
    imports: []
})
export class DirectiveModule {}
