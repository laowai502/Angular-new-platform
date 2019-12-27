import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BaseHttpInterceptor } from './base-interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptor, multi: true }
];
