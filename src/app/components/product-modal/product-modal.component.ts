import { HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ICategory } from '../../../assets/interface/category.interface';
import { IProduct } from '../../../assets/interface/product.interface';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
	selector: 'app-product-modal',
	templateUrl: './product-modal.component.html',
	styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
	id: number;
	form: FormGroup;
	arrCategory: ICategory[];
	urlImage: string;

	constructor(
		fb: FormBuilder,
		private productService: ProductService,
		categoryService: CategoryService,
		private snackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) data: IProduct
	) {
		this.arrCategory = [];
		this.urlImage = '';

		categoryService.findAll().subscribe(data => {
			if (data) {
				this.arrCategory = data;
			}
		});

		if (data) {
			this.id = data.id;
			if (data.image?.url) {
				this.urlImage = data.image?.url;
			}
			this.form = fb.group({
				name: [data.name, [Validators.required]],
				description: [data.description],
				categoryId: [data.category.id, [Validators.required]],
				amount: [data.amount, [Validators.required]],
				value: [Number(data.value), [Validators.required]]
			});
		} else {
			this.id = 0;
			this.form = fb.group({
				name: ['', [Validators.required]],
				description: [''],
				categoryId: ['', [Validators.required]],
				amount: [0, [Validators.required]],
				value: [0, [Validators.required]]
			});
		}
	}

	onSubmit(): void {
		const payload: IProduct = { ...this.form.value, id: this.id };
		this.productService.submit(payload).subscribe(
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
		if (event.target.files[0] && this.id !== 0) {
			const formData: FormData = new FormData();
			formData.append('file', event.target.files[0]);
			this.productService.submitImage(this.id, formData).subscribe(
				data => {
					this.urlImage = data.url;
					this.snackBar.open('Sucesso', 'OK', { duration: 2000 });
				},
				err => {
					console.error(err);
					this.snackBar.open(err.error.message, 'OK', { duration: 2000 });
				}
			);
		}
	}
}
