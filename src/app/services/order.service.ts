import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IOrder } from '../../assets/interface/order.interface';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	readonly url: string = 'http://localhost:3000/order';

	constructor(private http: HttpClient) {}

	findAll(): Observable<IOrder[]> {
		return this.http.get<IOrder[]>(`${this.url}/findAll`);
	}

	remove(id: number): Observable<boolean> {
		return this.http.delete<boolean>(`${this.url}/remove/${id}`);
	}
}
