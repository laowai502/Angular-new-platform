import { Injectable, Optional, SkipSelf } from '@angular/core';
import { AppModule } from '../app.module';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    // constructor(@Optional() @SkipSelf() parentModule?: AppModule) {
        // if (parentModule) {
        //     throw new Error(
        //         'GreetingModule is already loaded. Import it in the AppModule only');
        // }
        console.log('service has been loaded');
    }
}
