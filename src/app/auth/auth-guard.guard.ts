import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(): Observable<boolean> {
		return this.authService.isAuthenticate().pipe(
			tap(obj => {
				if (!obj) {
					this.router.navigateByUrl('/auth/login');
				}
			})
		);
	}
}
