import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ILogin } from '../../../../assets/interface/login.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	loading = false;
	loginForm: FormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]]
	});

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private snackBar: MatSnackBar,
		private router: Router
	) {}

	onSubmit(): void {
		const login: ILogin = this.loginForm.value;
		this.loading = true;
		this.authService.login(login).subscribe(
			() => {
				this.snackBar.open('Logado com Sucesso', 'OK', { duration: 2000 });
				this.router.navigateByUrl('/');
				this.loading = false;
			},
			() => {
				this.snackBar.open('Falha no login', 'OK', { duration: 2000 });
				this.loading = false;
			}
		);
	}
}
