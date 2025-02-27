import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { CitasService } from '../../services/citas/citas.service';
import { CitaDialogComponent } from '../../shared/componets/dialog/cita-dialog/cita-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AsignarCitaModuloDialogComponentTsComponent } from '../../shared/componets/dialog/asignar-cita-modulo-dialog.component.ts/asignar-cita-modulo-dialog.component.ts.component';
import { UsuarioService } from '../../services/usuario.service';
import { EditarDatoCiudadanoComponent } from '../../shared/componets/dialog/editar-dato-ciudadano/editar-dato-ciudadano.component';
import { VisorWebsocketService } from '../../services/visor-websocket/visor-websocket.service';

export interface UserData {
  id: string;
  identification: string;
  name: string;
  progress: string;
  fruit: string;
  state: string;
}
export interface Cita {
  id_turn: string;
  turn_desc: string;
  fec_registro: string;
  hora: string;
  id_cita: string;
  puesto: string;
  atendida: string;
  nombre_citizen: string;
  cedula: number;
  celular: string;
}

interface Appointment {
  date: string; // formato: yyyy-mm-dd
  name: string;
  priority: string;
}
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss',
})
export class CitasComponent {
  citas: any[] = [];
  selectedDate: string = '';
  userRole: string = '';
  displayedColumns: string[] = [
    'turn_desc',
    'atendida',
    'cedula',
    'nombre_citizen',
    'action',
  ];
 

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);
dataSourcePrioritarias = new MatTableDataSource<any>([]);
  constructor(
    private citasService: CitasService,
    private dialog: MatDialog,
    private usarioService: UsuarioService,
    private wsService: VisorWebsocketService
  ) {}

  ngOnInit(): void {
    this.userRole = this.usarioService.getUserRole();
    if (this.userRole === 'asignador') {
      this.cargarCitasPrioritarias();
    }
    this.cargarCitas();

  
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  cargarCitas(): void {
    this.userRole = this.usarioService.getUserRole();
    if (this.userRole === 'asignador') {
      this.citasService.listarCitas().subscribe({
        next: (data) => {
          console.log('Respuesta del servicio:', data);

          if (data && Array.isArray(data.citas)) {
            const citasFiltradas = data.citas.filter(
              (cita: Cita) => cita.atendida && cita.atendida !== 'S'
            );
            this.dataSource = new MatTableDataSource(data.citas);
            this.dataSource.data = data.citas;
            this.dataSource.paginator = this.paginator; 
            this.dataSource.sort = this.sort;
          } else {
            console.error('El formato de los datos no es válido:', data);
          }
        },
        error: (err) => {
          console.error('Error al cargar citas:', err);
        },
      });
    } else {
      this.citasService.listarCitasCarnet().subscribe({
        next: (data) => {
          console.log('Respuesta del servicio:', data);

          if (data && Array.isArray(data.citas)) {
            const citasFiltradas = data.citas.filter(
              (cita: Cita) => cita.atendida && cita.atendida !== 'S'
            );
            this.dataSource = new MatTableDataSource(citasFiltradas);
            // this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            console.error('El formato de los datos no es válido:', data);
          }
        },
        error: (err) => {
          console.error('Error al cargar citas:', err);
        },
      });
    }
  }

  cargarCitasPrioritarias() {
    this.citasService.listarCitasPrioritarias().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.citas)) {
          this.dataSourcePrioritarias = new MatTableDataSource(data.citas);
        } else {
          console.error('El formato de los datos no es válido:', data);
        }
      },
      error: (err) => {
        console.error('Error al cargar citas prioritarias:', err);
      },
    });
  }

  onDateChange(event: any) {
    const selected = event.value as Date;
    this.selectedDate = selected.toISOString().split('T')[0];
  }

  getAtendidaLabel(value: string): string {
    if (value === 'N') {
      return 'No ingresado';
    } else {
      return 'Ingresado';
    }
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }

  openDialog(cita: Cita, tipo: string): void {
    let dialogRef;

    if (this.userRole === 'atencion_ganadero') {
      dialogRef = this.dialog.open(CitaDialogComponent, {
        width: '800px',
        data: { cita },
      });
    } else {
      dialogRef = this.dialog.open(
        AsignarCitaModuloDialogComponentTsComponent,
        {
          width: '800px',
          data: { cita, tipo },
        }
      );
    }

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadCitas();
      }
    });
  }

  openEditDialog(cita: Cita): void {
    const dialogRef = this.dialog.open(EditarDatoCiudadanoComponent, {
      width: '400px',
      data: cita,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Encuentra la cita en la tabla y actualiza los datos
        const index = this.dataSource.data.findIndex(
          (c) => c.id_cita === result.id_cita
        );
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }

  reloadCitasPrioritarias() {
    this.cargarCitasPrioritarias();
  }

  reloadCitas() {
    this.cargarCitas();
  }
}
