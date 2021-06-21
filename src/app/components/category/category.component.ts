import { Observable } from 'rxjs';

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ICategory } from '../../../assets/interface/category.interface';
import { CategoryService } from '../../services/category.service';
import { CategoryModalComponent } from '../category-modal/category-modal.component';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
	category$!: Observable<ICategory[]>;

	displayedColumns: string[] = ['name', 'description', 'action'];

	dataSource = new MatTableDataSource<ICategory>();
	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;
	@ViewChild(MatSort, { static: true })
	sort!: MatSort;

	constructor(
		private categoryService: CategoryService,
		private dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.refresh();
	}

	add(): void {
		this.dialog
			.open(CategoryModalComponent)
			.afterClosed()
			.subscribe(() => this.refresh());
	}

	edit(category: ICategory): void {
		this.dialog
			.open(CategoryModalComponent, { data: category })
			.afterClosed()
			.subscribe(() => this.refresh());
	}

	refresh(): void {
		this.categoryService.findAll().subscribe(data => {
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
}
