import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';

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
		MatSnackBarModule,
		MatMenuModule,
		MatToolbarModule,
		MatProgressBarModule,
		MatSidenavModule,
		MatTableModule,
		MatSortModule,
		MatDialogModule,
		MatSlideToggleModule,
		MatSelectModule,
		MatGridListModule
	],
	declarations: []
})
export class MaterialModule {}
