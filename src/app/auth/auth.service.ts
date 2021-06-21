import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
	private readonly urlGetOnlineUser: string = 'http://localhost:3000/auth/get-online-user';

	private user$: BehaviorSubject<IUserCredentials> = new BehaviorSubject<IUserCredentials>(<IUserCredentials>{});
	private isAuthenticate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient) {}

	create(user: IUser): Observable<IUser> {
		return this.http.post<IUser>(this.urlCreateUser, user);
	}

	login(login: ILogin): Observable<IUserCredentials> {
		return this.http.post<IUserCredentials>(this.urlLoginUser, login).pipe(
			tap((userCredential: IUserCredentials) => {
				const accessToken: string = userCredential.accessToken;
				localStorage.setItem('accessToken', accessToken);
				this.isAuthenticate$.next(true);
				this.user$.next(userCredential);
			})
		);
	}

	logout(): void {
		localStorage.removeItem('accessToken');
		this.isAuthenticate$.next(false);
		this.user$.next(<IUserCredentials>{});
	}

	isAuthenticate(): Observable<boolean> {
		const token = localStorage.getItem('accessToken');
		if (token && !this.isAuthenticate$.value) {
			return this.checkTokenValidation();
		}
		return this.isAuthenticate$.asObservable();
	}

	checkTokenValidation(): Observable<boolean> {
		return this.http.get<IUserCredentials>(this.urlGetOnlineUser).pipe(
			tap((u: IUserCredentials) => {
				if (u) {
					localStorage.setItem('accessToken', u.accessToken);
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
