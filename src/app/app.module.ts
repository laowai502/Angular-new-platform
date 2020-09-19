import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { httpInterceptorProviders } from '../app/common/http/index';

import { HttpClientModule } from '@angular/common/http';

// primeNg Module
import { MessageService } from 'primeng/components/common/messageservice';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        ToastModule,
        AppRoutingModule,
        HttpClientModule
    ],
    exports: [],
    providers: [
        MessageService,
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
