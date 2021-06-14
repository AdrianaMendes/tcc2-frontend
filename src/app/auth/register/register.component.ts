import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { IUser } from '../../../assets/interface/user.interface';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	formRegister = this.fb.group(
		{
			fullName: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			passwordRepeated: ['', [Validators.required]],
			address: this.fb.group({
				cep: [''],
				state: [''],
				city: [''],
				district: [''],
				street: [''],
				number: [''],
				complement: ['']
			})
		},
		{ validator: this.matchingPassword }
	);

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private snackBar: MatSnackBar,
		private router: Router
	) {}

	ngOnInit(): void {}

	matchingPassword(group: FormGroup): { matching: boolean } | null {
		if (group) {
			const password = group.controls['password'].value;
			const passwordRepeated = group.controls['passwordRepeated'].value;
			if (password === passwordRepeated) {
				return null;
			}
		}
		return { matching: false };
	}

	onSubmit(): void {
		const user: IUser = { ...this.formRegister.value };
		this.authService.create(user).subscribe(
			() => {
				this.snackBar.open('Cadastrado com sucesso.', 'OK', { duration: 2000 });
				this.router.navigateByUrl('/auth/login');
			},
			err => {
				console.error(err);
				this.snackBar.open(err.error.message, 'OK', { duration: 2000 });
			}
		);
	}
}
