import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUserCredentials } from '../assets/interface/user-credentials.interface';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	isAuthenticate$: Observable<boolean>;
	user$: Observable<IUserCredentials>;

	constructor(private authService: AuthService, private router: Router) {
		this.isAuthenticate$ = this.authService.isAuthenticate();
		this.user$ = this.authService.getUser();
	}

	logout(): void {
		this.authService.logout();
		this.isAuthenticate$ = this.authService.isAuthenticate();
		this.router.navigateByUrl('/auth/login');
	}
}
