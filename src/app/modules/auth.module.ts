import { NgxMaskModule } from 'ngx-mask';

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from '../components/auth/auth-routing.module';
import { AuthInterceptor } from '../components/auth/auth.interceptor';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [CommonModule, AuthRoutingModule, MaterialModule, ReactiveFormsModule, NgxMaskModule.forRoot()]
})
export class AuthModule {
	static forRoot(): ModuleWithProviders<AuthModule> {
		return { ngModule: AuthModule, providers: [AuthInterceptor] };
	}
}
