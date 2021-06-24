import { ChangeDetectorRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Label } from 'ng2-charts';
import { IDashboardData } from '../../../assets/interface/dashboar-data.interface';
import { IPaymentType } from '../../../assets/interface/payment-type.interface';
import { IUser } from '../../../assets/interface/user.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	dashboardData!: IDashboardData;
	readonly pieChartLabels: Label[];
	readonly lastUsersColumns: string[] = ['fullName', 'lastLoginDate', 'role'];
	lastUsersDataSource = new MatTableDataSource<IUser>();
	pieChartData: number[];
	isChartLoaded: boolean;
	@ViewChild(MatSort, { static: true })
	sort!: MatSort;

	constructor(private dashboardService: DashboardService, private changeDetectorRefs: ChangeDetectorRef) {
		this.pieChartData = [0, 0, 0, 0, 0];
		this.isChartLoaded = false;
		this.dashboardData = {
			closedOrder: 0,
			registredProducts: 0,
			movimentedValue: 0,
			paymentType: { CASH: 0, PIX: 0, DEBIT: 0, CREDIT_CARD: 0, NOT_INFORMED: 0 } as IPaymentType,
			lastUsers: []
		} as IDashboardData;
		this.pieChartLabels = ['Pix', 'Dinheiro', 'Crédito', 'Débito', 'Não informado'];
	}

	ngOnInit(): void {
		this.refresh();
	}

	refresh(): void {
		this.dashboardService.getDashboardData().subscribe(data => {
			if (data) {
				this.dashboardData = data;
				this.pieChartData[0] = data.paymentType.PIX;
				this.pieChartData[1] = data.paymentType.CASH;
				this.pieChartData[2] = data.paymentType.CREDIT_CARD;
				this.pieChartData[3] = data.paymentType.DEBIT;
				this.pieChartData[4] = data.paymentType.NOT_INFORMED;
				this.isChartLoaded = true;
				this.lastUsersDataSource.data = this.dashboardData.lastUsers;
				this.lastUsersDataSource.sort = this.sort;
			}
			this.changeDetectorRefs.detectChanges();
		});
	}
}
