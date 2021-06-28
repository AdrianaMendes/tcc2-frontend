import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IDashboardData } from '../../assets/interface/dashboar-data.interface';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {
	private readonly BASE_URL: string = `${environment.API_URL}/dashboard`;

	constructor(private http: HttpClient) {}

	getDashboardData(): Observable<IDashboardData> {
		return this.http.get<IDashboardData>(`${this.BASE_URL}`);
	}
}
