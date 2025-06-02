import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormAddEditComponent } from './form-add-edit/form-add-edit.component';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { FormalizadoresService } from '../../services/formalizadores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  email: string;
}

@Component({
  selector: 'app-formalizadores',
  templateUrl: './formalizadores.component.html',
  styleUrl: './formalizadores.component.scss',
})
export class FormalizadoresComponent {
  displayedColumns: string[] = ['username','first_name', 'email', 'role'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private formalizadoService: FormalizadoresService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadFormalizadores();
  }

  loadFormalizadores(): void {
    this.formalizadoService.getFormalizadores().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: () => {
        this.snackBar.open('Error al cargar los formalizadores.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  openAddFormalizador() {
    this._dialog.open(FormAddEditComponent);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
