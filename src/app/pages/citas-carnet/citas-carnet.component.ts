import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CitasService } from '../../services/citas/citas.service';
import { UsuarioService } from '../../services/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-citas-carnet',
  templateUrl: './citas-carnet.component.html',
  styleUrl: './citas-carnet.component.scss',
})
export class CitasCarnetComponent {
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userRole: string = '';
  displayedColumns: string[] = [
    'turn_desc',
    'atendida',
    'cedula',
    'nombre_citizen',
    'action',
  ];
  constructor(
    private citasService: CitasService,
    private usarioService: UsuarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  getAtendidaLabel(value: string): string {
    if (value === 'N') {
      return 'No atendida';
    } else {
      return 'Atendida';
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
  }

  cargarCitas(): void {
    this.userRole = this.usarioService.getUserRole();
    {
      this.citasService.listarCitasCarnet().subscribe({
        next: (data) => {
          console.log('Respuesta del servicio:', data);
          if (data && Array.isArray(data.citas)) {
            this.dataSource = new MatTableDataSource(data.citas);
            this.dataSource.paginator = this.paginator;
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

  atenderCita(cita: any) {
    const idCita = cita.id_cita;

    this.citasService.actualizarEstadoCitaCarnet(idCita, 'A').subscribe({
      next: (res) => {
        this.handleSuccess(res, 'estado');
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  private handleSuccess(res: any, estado: string): void {
    this.snackBar.open('Cita actualizada con éxito', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    this.cargarCitas();
  }

  private handleError(err: any): void {
    console.error('Error al actualizar el estado:', err);
    this.snackBar.open(
      'Error al actualizar la cita. Intenta nuevamente.',
      'Cerrar',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );
  }
}
