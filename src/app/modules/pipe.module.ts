import { NgModule } from '@angular/core';

import { PaymentTypePipe } from '../../assets/pipe/payment-type.pipe';
import { StatusPipe } from '../../assets/pipe/status.pipe';
import { UserRolePipe } from '../../assets/pipe/user-role.pipe';

@NgModule({
	exports: [PaymentTypePipe, StatusPipe, UserRolePipe],
	declarations: [PaymentTypePipe, StatusPipe, UserRolePipe]
})
export class PipeModule {}
