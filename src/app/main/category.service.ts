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
}
