import { Component, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { CitasService } from '../../services/citas/citas.service';
import { CitaDialogComponent } from '../../shared/componets/dialog/cita-dialog/cita-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AsignarCitaModuloDialogComponentTsComponent } from '../../shared/componets/dialog/asignar-cita-modulo-dialog.component.ts/asignar-cita-modulo-dialog.component.ts.component';
import { UsuarioService } from '../../services/usuario.service';
import { EditarDatoCiudadanoComponent } from '../../shared/componets/dialog/editar-dato-ciudadano/editar-dato-ciudadano.component';
import { VisorWebsocketService } from '../../services/visor-websocket/visor-websocket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { ReportesService } from '../../services/reportes/reportes.service';

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

  displayedColumnsInfoCitas: string[] = [
    'turn_desc',
    'cedula',
    'nombre_citizen',
      'celular'
  ]

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;
  @ViewChild('paginatorPrioritarias', { static: false }) paginatorPrioritarias!: MatPaginator;
  @ViewChild('paginatorInfoCitas', { static: false }) paginatorInfoCitas!: MatPaginator;
  


  dataSource = new MatTableDataSource<any>([]);
  dataSourcePrioritarias = new MatTableDataSource<any>([]);
  dataSourceInfoCitas = new MatTableDataSource<any>([]);
  showInfo : boolean = false;

  dataCitas: any;
  constructor(
    private citasService: CitasService,
    private dialog: MatDialog,
    private usarioService: UsuarioService,
    private wsService: VisorWebsocketService,
    private fb: FormBuilder,
    private reportesService: ReportesService
  ) {
    this.reporteForm = this.fb.group({
      fecha: [moment().toDate(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.userRole = this.usarioService.getUserRole();
    if (
      this.userRole === 'asignador' ||
      this.userRole === 'administrador_pasaportes'
    ) {
      this.cargarCitasPrioritarias();
    }
    this.cargarCitas();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSourcePrioritarias.paginator = this.paginatorPrioritarias;
      this.dataSource.sort = this.sort;
      this.dataSourceInfoCitas.paginator = this.paginatorInfoCitas; 
    });
  }
  
  cargarCitas(): void {
    this.citasService.listarCitas().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.citas)) {
          this.dataSource = new MatTableDataSource(data.citas);
  
          setTimeout(() => {
            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
            }
          });
        } else {
          console.error('El formato de los datos no es válido:', data);
        }
      },
      error: (err) => {
        console.error('Error al cargar citas:', err);
      },
    });
  }
  
  cargarCitasPrioritarias() {
    this.citasService.listarCitasPrioritarias().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.citas)) {
          this.dataSourcePrioritarias = new MatTableDataSource(data.citas);
  
          setTimeout(() => {
            if (this.paginatorPrioritarias) {
              this.dataSourcePrioritarias.paginator = this.paginatorPrioritarias;
            }
          });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.dataSourcePrioritarias.filter = filterValue;
    if (this.dataSourcePrioritarias.paginator) {
      this.dataSourcePrioritarias.paginator.firstPage();
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
    this.cargarCitasPrioritarias();
  }
  reporteForm: FormGroup;
  consultarCitas(): void {
    const fechaSeleccionada = moment(this.reporteForm.value.fecha).format('YYYY-MM-DD');
  
    this.reportesService.getReporteInfoCitasPasaportes(fechaSeleccionada).subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.citas)) {
          this.showInfo = true;
          this.dataSourceInfoCitas = new MatTableDataSource(response.citas);
          
          setTimeout(() => { 
            if (this.paginatorInfoCitas) {
              this.dataSourceInfoCitas.paginator = this.paginatorInfoCitas;
            }
          });
        }
      },
      error: (error) => {
        console.log(error, 'err');
      },
    });
  }
  
  applyFilterInfoCitas(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    // Configurar el filtro para que busque en múltiples columnas
    this.dataSourceInfoCitas.filterPredicate = (data: any, filter: string) => {
      return (
        data.nombre_citizen.toLowerCase().includes(filter) ||
        data.cedula.toString().includes(filter) ||
        data.celular.toString().includes(filter)
      );
    };
  
    this.dataSourceInfoCitas.filter = filterValue;
  
    if (this.dataSourceInfoCitas.paginator) {
      this.dataSourceInfoCitas.paginator.firstPage();
    }
  }

  
}
