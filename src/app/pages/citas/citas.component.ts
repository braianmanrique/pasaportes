import { Component,AfterViewInit ,ViewChild } from '@angular/core';

import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';

export interface UserData {
  id: string;
  identification: string;
  name: string;
  progress: string;
  fruit: string;
  state: string;
}
const STATE: string[] = [
  'Activo',
  'Descanso',
  'Ausente',
  'Accion'
 
];
const NAMES: string[] = [
  'Braian',
  'Giovanny',
  'Fabian',
  'Andrea',
  'Alisson',
  'Andrea',
  'Isla',
  'Mia',
  
];

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss'
})
export class CitasComponent {
  displayedColumns: string[] = ['id', 'name', 'progress', 'caja', 'fruit', 'estado'];
  dataSource: MatTableDataSource<any> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;
  
  constructor(){
    const users = Array.from({length: 20}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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
    identification: '1121904863',
    name: name,
    progress: Math.round(Math.random() * 10).toString(),
    state: 'Activo',
    fruit: STATE[Math.round(Math.random() * (STATE.length - 1))],
  };
}
