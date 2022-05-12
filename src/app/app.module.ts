import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from '../app/core/http/index';

import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

import { environment } from '../environments/environment';

// tslint:disable-next-line: no-unused-expression
// !environment.mock && require('../mock');

const ngZorroConfig: NzConfig = {
	message: { nzMaxStack: 1, nzDuration: 1500, nzTop: 120 }
};

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NzMessageModule,
		HttpClientModule
	],
	providers: [
		httpInterceptorProviders,
		{ provide: NZ_CONFIG, useValue: ngZorroConfig }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
