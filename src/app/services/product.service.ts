import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IProduct } from '../../assets/interface/product.interface';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	readonly url: string = 'http://localhost:3000/product';

	constructor(private http: HttpClient) {}

	findAll(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>(`${this.url}/findAll`);
	}

	submit(payload: IProduct): Observable<IProduct> {
		if (payload.id === 0) {
			return this.http.post<IProduct>(`${this.url}/create`, payload);
		} else {
			return this.http.patch<IProduct>(`${this.url}/update/${payload.id}`, payload);
		}
	}

	toggleAvailability(id: number): Observable<IProduct> {
		return this.http.patch<IProduct>(`${this.url}/toggleAvailability/${id}`, null);
	}
}
