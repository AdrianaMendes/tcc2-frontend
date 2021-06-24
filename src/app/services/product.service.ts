import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IProduct } from '../../assets/interface/product.interface';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private readonly BASE_URL: string = `${environment.API_URL}/product`;

	constructor(private http: HttpClient) {}

	findAll(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>(`${this.BASE_URL}/findAll`);
	}

	submit(payload: IProduct): Observable<IProduct> {
		if (payload.id === 0) {
			return this.http.post<IProduct>(`${this.BASE_URL}/create`, payload);
		} else {
			return this.http.patch<IProduct>(`${this.BASE_URL}/update/${payload.id}`, payload);
		}
	}

	toggleAvailability(id: number): Observable<IProduct> {
		return this.http.patch<IProduct>(`${this.BASE_URL}/toggleAvailability/${id}`, null);
	}
}
