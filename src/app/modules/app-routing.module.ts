import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.guard';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/main/dashboard' },
	{ path: '', pathMatch: 'full', redirectTo: '/main/user' },
	{
		path: 'main',
		loadChildren: () => import('src/app/modules/main.module').then(m => m.MainModule),
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
