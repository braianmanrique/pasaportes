import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormAddEditComponent } from './form-add-edit/form-add-edit.component';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
const STATE: string[] = [
  'Activo',
  'Descanso',
  'Ausente',
 
];
const NAMES: string[] = [
  'Braian',
  'Giovanny',
  'Fabian',
  'Andrea',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-formalizadores',
  templateUrl: './formalizadores.component.html',
  styleUrl: './formalizadores.component.scss'
})
export class FormalizadoresComponent {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<any> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;
  

  constructor(private _dialog: MatDialog){
    const users = Array.from({length: 20}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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

function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 10).toString(),
    fruit: STATE[Math.round(Math.random() * (STATE.length - 1))],
  };
}
