import { Observable } from 'rxjs';

import { Component } from '@angular/core';

import { IUserCredentials } from '../assets/interface/user-credentials.interface';
import { AuthService } from './auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	isAuthenticated$: Observable<boolean>;
	userCredentials$: Observable<IUserCredentials>;

	constructor(private authService: AuthService) {
		this.isAuthenticated$ = this.authService.isAuthenticated();
		this.userCredentials$ = this.authService.getUser();
	}
}
