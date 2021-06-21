import { NgxMaskModule } from 'ngx-mask';

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../modules/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [CommonModule, AuthRoutingModule, MaterialModule, ReactiveFormsModule, NgxMaskModule.forRoot()]
})
export class AuthModule {
	static forRoot(): ModuleWithProviders<AuthModule> {
		return { ngModule: AuthModule, providers: [AuthInterceptor] };
	}
}
