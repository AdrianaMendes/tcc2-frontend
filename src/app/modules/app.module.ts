import { NgxMaskModule } from 'ngx-mask';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '../app.component';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthModule } from '../auth/auth.module';
import { CategoryModalComponent } from '../components/category-modal/category-modal.component';
import { CategoryComponent } from '../components/category/category.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { OrderComponent } from '../components/order/order.component';
import { ProductModalComponent } from '../components/product-modal/product-modal.component';
import { ProductComponent } from '../components/product/product.component';
import { UserModalComponent } from '../components/user-modal/user-modal.component';
import { UserComponent } from '../components/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { PipeModule } from './pipe.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
	declarations: [
		AppComponent,
		CategoryComponent,
		ProductComponent,
		OrderComponent,
		UserComponent,
		DashboardComponent,
		UserModalComponent,
		CategoryModalComponent,
		ProductModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MaterialModule,
		AuthModule.forRoot(),
		FormsModule,
		ReactiveFormsModule,
		NgxMaskModule.forRoot(),
		PipeModule,
		ChartsModule
	],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule {}
