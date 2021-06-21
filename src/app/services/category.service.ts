import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICategory } from '../../assets/interface/category.interface';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	readonly url: string = 'http://localhost:3000/category';

	constructor(private http: HttpClient) {}

	findAll(): Observable<ICategory[]> {
		return this.http.get<ICategory[]>(`${this.url}/findAll`);
	}

	submit(payload: ICategory): Observable<ICategory> {
		if (payload.id === 0) {
			return this.http.post<ICategory>(`${this.url}/create`, payload);
		} else {
			return this.http.patch<ICategory>(`${this.url}/update/${payload.id}`, payload);
		}
	}
}
