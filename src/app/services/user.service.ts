import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IUser } from '../../assets/interface/user.interface';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	readonly url: string = 'http://localhost:3000/user';

	constructor(private http: HttpClient) {}

	findAll(): Observable<IUser[]> {
		return this.http.get<IUser[]>(`${this.url}/findAll`);
	}

	update(id: number, user: IUser): Observable<IUser[]> {
		return this.http.patch<IUser[]>(`${this.url}/update/${id}`, user);
	}

	toggleAvailability(id: number): Observable<IUser> {
		return this.http.patch<IUser>(`${this.url}/toggleAvailability/${id}`, null);
	}
}
