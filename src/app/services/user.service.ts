import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IUser } from '../../assets/interface/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private readonly BASE_URL: string = `${environment.API_URL}/user`;

	constructor(private http: HttpClient) {}

	findAll(): Observable<IUser[]> {
		return this.http.get<IUser[]>(`${this.BASE_URL}/findAll`);
	}

	update(id: number, user: IUser): Observable<IUser[]> {
		return this.http.patch<IUser[]>(`${this.BASE_URL}/update/${id}`, user);
	}

	toggleAvailability(id: number): Observable<IUser> {
		return this.http.patch<IUser>(`${this.BASE_URL}/toggleAvailability/${id}`, null);
	}
}
