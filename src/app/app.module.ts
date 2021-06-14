import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CategoryComponent } from './main/category/category.component';
import { OrderComponent } from './main/order/order.component';
import { ProductComponent } from './main/product/product.component';
import { UserComponent } from './main/user/user.component';
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [AppComponent, CategoryComponent, ProductComponent, OrderComponent, UserComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, MaterialModule, AuthModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
