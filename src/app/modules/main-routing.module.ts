import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from '../components/category/category.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { OrderComponent } from '../components/order/order.component';
import { ProductComponent } from '../components/product/product.component';
import { UserComponent } from '../components/user/user.component';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'order', component: OrderComponent },
	{ path: 'category', component: CategoryComponent },
	{ path: 'product', component: ProductComponent },
	{ path: 'user', component: UserComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule {}
