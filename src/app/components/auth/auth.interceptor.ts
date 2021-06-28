import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService, private router: Router) {}

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
		if (accessToken) {
			const authReq = req.clone({
				setHeaders: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				}
			});
			return next.handle(authReq).pipe(
				catchError(err => {
					console.error(err);
					if (err instanceof HttpErrorResponse) {
						if (err.status === 401) {
							this.authService.logout();
							this.router.navigateByUrl('auth/login');
						}
					}
					return throwError(err);
				})
			);
		}
		return next.handle(req);
	}
}
