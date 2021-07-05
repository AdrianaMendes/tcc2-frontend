import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ICategory } from '../../../assets/interface/category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
	selector: 'app-category-modal',
	templateUrl: './category-modal.component.html',
	styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent {
	id: number;
	form: FormGroup;
	urlImage: string;

	constructor(
		private fb: FormBuilder,
		private categoryService: CategoryService,
		private snackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) public data: ICategory
	) {
		this.urlImage = '';

		if (data) {
			if (data.image?.url) {
				this.urlImage = data.image?.url;
			}
			this.id = data.id;
			this.form = fb.group({
				name: [data.name, [Validators.required]],
				description: [data.description]
			});
		} else {
			this.id = 0;
			this.form = fb.group({
				name: ['', [Validators.required]],
				description: ['']
			});
		}
	}

	onSubmit(): void {
		const category: ICategory = { ...this.form.value, id: this.id };
		this.categoryService.submit(category).subscribe(
			() => {
				this.snackBar.open('Sucesso', 'OK', { duration: 2000 });
			},
			err => {
				console.error(err);
				this.snackBar.open(err.error.message, 'OK', { duration: 2000 });
			}
		);
	}

	onSubmitImage(event: any): void {
		if (event.target.files && this.id !== 0) {
			const formData: FormData = new FormData();
			formData.append('file', event.target.files[0]);
			this.categoryService.submitImage(this.id, formData).subscribe(
				data => {
					this.snackBar.open('Sucesso', 'OK', { duration: 2000 });
					this.urlImage = data.url;
				},
				err => {
					console.error(err);
					this.snackBar.open(err.error.message, 'OK', { duration: 2000 });
				}
			);
		}
	}
}
