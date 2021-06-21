import { Observable } from 'rxjs';

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IProduct } from '../../../assets/interface/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
	product$!: Observable<IProduct[]>;
	displayedColumns: string[] = ['category', 'name', 'description', 'amount', 'isActive', 'value', 'action'];

	dataSource = new MatTableDataSource<IProduct>();
	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;
	@ViewChild(MatSort, { static: true })
	sort!: MatSort;

	constructor(
		private productService: ProductService,
		private dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.refresh();
	}

	add(): void {
		this.dialog
			.open(ProductModalComponent)
			.afterClosed()
			.subscribe(() => this.refresh());
	}

	edit(payload: IProduct): void {
		this.dialog
			.open(ProductModalComponent, { data: payload })
			.afterClosed()
			.subscribe(() => this.refresh());
	}

	refresh(): void {
		this.productService.findAll().subscribe(data => {
			if (data) {
				this.dataSource.data = data;
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			} else {
				this.dataSource.data = [];
			}
			this.changeDetectorRefs.detectChanges();
		});
	}

	toggleAvailability(id: number): void {
		this.productService.toggleAvailability(id).subscribe(
			() => {
				this.refresh();
			},
			err => {
				console.error(err);
			}
		);
	}
}
