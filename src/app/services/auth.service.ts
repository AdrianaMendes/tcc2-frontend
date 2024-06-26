import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ILogin } from '../../assets/interface/login.interface';
import { IUserCredentials } from '../../assets/interface/user-credentials.interface';
import { IUser } from '../../assets/interface/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly URL_CREATE_USER: string = `${environment.API_URL}/user/create`;
	private readonly URL_LOGIN_USER: string = `${environment.API_URL}/auth/sign-in`;
	private readonly URL_GET_ONLINE_USER: string = `${environment.API_URL}/auth/get-online-user`;

	private user$: BehaviorSubject<IUserCredentials> = new BehaviorSubject<IUserCredentials>(<IUserCredentials>{});
	private isAuthenticate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient) {}

	create(user: IUser): Observable<IUser> {
		return this.http.post<IUser>(this.URL_CREATE_USER, user);
	}

	login(login: ILogin): Observable<IUserCredentials> {
		return this.http.post<IUserCredentials>(this.URL_LOGIN_USER, login).pipe(
			tap((userCredential: IUserCredentials) => {
				const accessToken: string = userCredential.accessToken;
				if (typeof window !== 'undefined') {
					localStorage.setItem('accessToken', accessToken);
				}
				this.isAuthenticate$.next(true);
				this.user$.next(userCredential);
			})
		);
	}

	logout(): void {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('accessToken');
		}
		this.isAuthenticate$.next(false);
		this.user$.next(<IUserCredentials>{});
	}

	isAuthenticate(): Observable<boolean> {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('accessToken');
			if (token && !this.isAuthenticate$.value) {
				return this.checkTokenValidation();
			}
		}
		return this.isAuthenticate$.asObservable();
	}

	checkTokenValidation(): Observable<boolean> {
		return this.http.get<IUserCredentials>(this.URL_GET_ONLINE_USER).pipe(
			tap((u: IUserCredentials) => {
				if (u) {
					if (typeof window !== 'undefined') {
						localStorage.setItem('accessToken', u.accessToken);
					}
					this.user$.next(u);
					this.isAuthenticate$.next(true);
				}
			}),
			map((u: IUserCredentials) => (u ? true : false)),
			catchError(() => {
				this.logout();
				return of(false);
			})
		);
	}

	getUser(): Observable<IUserCredentials> {
		return this.user$.asObservable();
	}
}
