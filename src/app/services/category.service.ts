import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICategory } from '../../assets/interface/category.interface';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	private readonly BASE_URL: string = `${environment.API_URL}/category`;

	constructor(private http: HttpClient) {}

	findAll(): Observable<ICategory[]> {
		return this.http.get<ICategory[]>(`${this.BASE_URL}/findAll`);
	}

	submit(payload: ICategory): Observable<ICategory> {
		if (payload.id === 0) {
			return this.http.post<ICategory>(`${this.BASE_URL}/create`, payload);
		} else {
			return this.http.patch<ICategory>(`${this.BASE_URL}/update/${payload.id}`, payload);
		}
	}

	submitImage(id: number, formData: FormData): Observable<any> {
		return this.http.post<FormData>(`${this.BASE_URL}/image/${id}`, formData);
	}
}
