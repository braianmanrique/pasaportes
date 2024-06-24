import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';





@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatSortModule,
    MatIconButton,
    MatIconModule
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatIconButton,
    MatIconModule
  ]
})
export class MaterialModule { }
