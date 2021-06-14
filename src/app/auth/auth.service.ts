import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ILogin } from '../../assets/interface/login.interface';
import { IUserCredentials } from '../../assets/interface/user-credentials.interface';
import { IUser } from '../../assets/interface/user.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly urlCreateUser: string = 'http://localhost:3000/user/create';
	private readonly urlLoginUser: string = 'http://localhost:3000/auth/sign-in';

	private subjUser$: BehaviorSubject<IUserCredentials> = new BehaviorSubject<IUserCredentials>(
		{} as IUserCredentials
	);
	private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient) {}

	create(user: IUser): Observable<IUser> {
		return this.http.post<IUser>(this.urlCreateUser, user);
	}

	login(login: ILogin): Observable<IUserCredentials> {
		return this.http.post<IUserCredentials>(this.urlLoginUser, login).pipe(
			tap((userCredential: IUserCredentials) => {
				const accessToken: string = userCredential.accessToken;
				localStorage.setItem('accessToken', accessToken);
				this.subjLoggedIn$.next(true);
				this.subjUser$.next(userCredential);
			})
		);
	}

	isAuthenticated(): Observable<boolean> {
		return this.subjLoggedIn$.asObservable();
	}

	getUser(): Observable<IUserCredentials> {
		return this.subjUser$.asObservable();
	}
}
