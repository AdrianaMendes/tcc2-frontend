import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [CommonModule, AuthRoutingModule, MaterialModule, ReactiveFormsModule]
})
export class AuthModule {}
