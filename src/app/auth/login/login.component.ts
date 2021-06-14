import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ILogin } from '../../../assets/interface/login.interface';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

	ngOnInit(): void {}

	async onSubmit(): Promise<void> {
		const login: ILogin = this.loginForm.value;
		await this.authService.login(login).subscribe(
			() => {
				this.snackBar.open('Logado com sucesso.', 'OK', { duration: 2000 });
				this.router.navigateByUrl('/');
			},
			() => {
				this.snackBar.open('Falha no login', 'OK', { duration: 2000 });
			}
		);
	}
}
