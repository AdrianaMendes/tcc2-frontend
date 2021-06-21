import { Observable } from 'rxjs';

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IOrder } from '../../../assets/interface/order.interface';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IProduct } from '../../../assets/interface/product.interface';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
		])
	]
})
export class OrderComponent implements OnInit {
	expandedElement: IProduct | null | undefined;
	order$!: Observable<IOrder[]>;
	displayedColumns: string[] = [
		'id',
		'user',
		'paymentType',
		'status',
		'creationDate',
		'updateDate',
		'totalValue',
		'action'
	];
	productColumns: string[] = ['name', 'category', 'amount', 'originalProductValue', 'total'];

	dataSource = new MatTableDataSource<IOrder>();
	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;
	@ViewChild(MatSort, { static: true })
	sort!: MatSort;

	constructor(
		private orderService: OrderService,
		private changeDetectorRefs: ChangeDetectorRef,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.refresh();
	}

	remove(id: number): void {
		this.orderService.remove(id).subscribe(() => {
			this.refresh();
			this.snackBar.open('Sucesso', 'OK', { duration: 2000 });
		});
	}

	refresh(): void {
		this.orderService.findAll().subscribe(data => {
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
