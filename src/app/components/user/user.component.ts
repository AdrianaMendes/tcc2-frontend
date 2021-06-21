import { Observable } from 'rxjs';

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IUser } from '../../../assets/interface/user.interface';
import { UserService } from '../../services/user.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	user$!: Observable<IUser[]>;
	displayedColumns: string[] = ['fullName', 'role', 'email', 'creationDate', 'lastLoginDate', 'isActive', 'action'];

	dataSource = new MatTableDataSource<IUser>();
	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;
	@ViewChild(MatSort, { static: true })
	sort!: MatSort;

	constructor(
		private userService: UserService,
		private dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.refresh();
	}

	edit(user: IUser): void {
		this.dialog
			.open(UserModalComponent, { data: user })
			.afterClosed()
			.subscribe(() => this.refresh());
	}

	toggleAvailability(id: number): void {
		this.userService.toggleAvailability(id).subscribe(
			() => {
				this.refresh();
			},
			err => {
				console.error(err);
			}
		);
	}

	refresh(): void {
		this.userService.findAll().subscribe(data => {
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
