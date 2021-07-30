import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IOrder } from '../../assets/interface/order.interface';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	private readonly BASE_URL: string = `${environment.API_URL}/order`;

	constructor(private http: HttpClient) {}

	findAll(): Observable<IOrder[]> {
		return this.http.get<IOrder[]>(`${this.BASE_URL}/findAll`);
	}

	remove(id: number): Observable<boolean> {
		return this.http.delete<boolean>(`${this.BASE_URL}/remove/${id}`);
	}

	closeOrder(id: number): Observable<boolean> {
		return this.http.patch<boolean>(`${this.BASE_URL}/closeOrder/${id}`, null);
	}

	update(payload: IOrder): Observable<boolean> {
		const payloadTransform = { id: payload.id, paymentType: payload.paymentType, status: payload.status };
		return this.http.patch<boolean>(`${this.BASE_URL}/update/`, payloadTransform);
	}
}
