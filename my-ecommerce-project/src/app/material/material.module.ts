import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  exports: [
    CommonModule,       MatCardModule,  MatButtonModule,
    MatSidenavModule,   MatListModule,  MatIconModule,
    MatToolbarModule,   MatMenuModule,  MatTreeModule,
    MatExpansionModule, MatRadioModule, MatDialogModule,
    MatGridListModule,  MatSnackBarModule
  ]
})


export class MaterialModule { }