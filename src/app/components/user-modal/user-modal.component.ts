import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IUser } from '../../../assets/interface/user.interface';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-user-modal',
	templateUrl: './user-modal.component.html',
	styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
	userID: number;
	userForm = this.fb.group({
		fullName: [this.data.fullName, [Validators.required]],
		email: [this.data.email, [Validators.required, Validators.email]],
		address: this.fb.group({
			cep: [this.data.address?.cep],
			state: [this.data.address?.state],
			city: [this.data.address?.city],
			district: [this.data.address?.district],
			street: [this.data.address?.street],
			number: [this.data.address?.number],
			complement: [this.data.address?.complement]
		})
	});

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private snackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) public data: IUser
	) {
		this.userID = this.data.id;
	}

	onSubmit(): void {
		const user: IUser = { ...this.userForm.value };
		this.userService.update(this.userID, user).subscribe(
			() => {
				this.snackBar.open('Sucesso', 'OK', { duration: 2000 });
			},
			err => {
				console.error(err);
				this.snackBar.open(err.error.message, 'OK', { duration: 2000 });
			}
		);
	}
}
