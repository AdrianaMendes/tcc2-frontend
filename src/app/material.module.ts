import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	imports: [],
	exports: [
		FlexLayoutModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule
	],
	declarations: []
})
export class MaterialModule {}
