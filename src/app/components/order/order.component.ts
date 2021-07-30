import { Observable } from 'rxjs';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { EOrderStatus } from '../../../assets/enum/order-status.enum';
import { EPaymentType } from '../../../assets/enum/payment-type.enum';
import { IOrder } from '../../../assets/interface/order.interface';
import { IProduct } from '../../../assets/interface/product.interface';
import { OrderService } from '../../services/order.service';

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
	orderStatusArr: { value: string }[];
	paymentTypeArr: { value: string }[];
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
		private dialog: MatDialog,
		private snackBar: MatSnackBar
	) {
		this.paymentTypeArr = Object.keys(EPaymentType).map(key => ({
			value: EPaymentType[key as keyof typeof EPaymentType]
		}));

		this.orderStatusArr = Object.keys(EOrderStatus).map(key => ({
			value: EOrderStatus[key as keyof typeof EOrderStatus]
		}));
	}

	ngOnInit(): void {
		this.refresh();
	}

	remove(id: number): void {
		this.orderService.remove(id).subscribe(() => {
			this.refresh();
			this.snackBar.open('Sucesso', 'OK', { duration: 2000 });
		});
	}

	closeOrder(id: number): void {
		this.orderService.closeOrder(id).subscribe(() => {
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

	updateOrder(data: IOrder): void {
		this.orderService.update(data).subscribe(() => {
			this.refresh();
		});
	}

	expand(
		event: Event,
		expandedElement: IProduct | null | undefined,
		element: IProduct | null | undefined
	): IProduct | null | undefined {
		const isExpand: boolean = (event.target as HTMLInputElement).className.includes('mat-cell');
		if (isExpand) {
			return expandedElement === element ? null : element;
		}
		return null;
	}
}
