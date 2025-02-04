import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmaModuloDialogComponentTsComponent } from '../../shared/componets/dialog/confirma-modulo-dialog.component.ts/confirma-modulo-dialog.component.ts.component';
import { CitasService } from '../../services/citas/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaDialogComponent } from '../../shared/componets/dialog/cita-dialog/cita-dialog.component';
import { Router } from '@angular/router';

export interface Cita {
  id_turn: string;
  turn_desc: string;
  fec_registro: string;
  hora: string;
  id_cita: string;
  puesto: string;
  atendida: string;
  nombre_citizen: string;
}

@Component({
  selector: 'app-seleccionar-modulo',
  templateUrl: './seleccionar-modulo.component.html',
  styleUrl: './seleccionar-modulo.component.scss',
})
export class SeleccionarModuloComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private citasService: CitasService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  oficinaSeleccionada: any = null;
  mpleadoCitaActual: any = null;
  oficinas = [
    { id: 1, nombre: 'Modulo 1', estado: 'libre' },
    { id: 2, nombre: 'Modulo 2', estado: 'ocupado' },
    { id: 3, nombre: 'Modulo 3', estado: 'ocupado' },
    { id: 4, nombre: 'Modulo 4', estado: 'ocupado' },
    { id: 5, nombre: 'Modulo 5', estado: 'ocupado' },
    { id: 6, nombre: 'Modulo 6', estado: 'ocupado' },
    { id: 7, nombre: 'Modulo 7', estado: 'ocupado' },
    { id: 8, nombre: 'Modulo 8', estado: 'ocupado' },
    { id: 9, nombre: 'Modulo 9', estado: 'ocupado' },
    { id: 10, nombre: 'Modulo 10', estado: 'ocupado' },
  ];
  citasPrioritarias: any[] = [];
  citas = [];
  displayedColumns: string[] = [
    'nombre_citizen',
    'fec_registro',
    'hora',
    'atendida',
    'action',
  ];

  ngOnInit(){
    this.liberarModulo()
  }

openConfirmDialog(oficina: any) {
  const dialogRef = this.dialog.open(
    ConfirmaModuloDialogComponentTsComponent,
    { data: oficina }
  );



  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.citasService.seleccionarCaja(oficina.id).subscribe({
        next: () => {
          this.oficinaSeleccionada = oficina; // Actualiza la oficina seleccionada
          this.cargarCitas(); // Carga las citas normales
          this.cargarPrioritarias(); // Carga las citas prioritarias
        },
        error: (err) => {
          console.error('Error al seleccionar la caja', err);
          this.snackBar.open(err.error.error, 'Cerrar', { duration: 3000 });
        },
      });
    }
  });
}

  liberarModulo() {
    this.citasService.liberarCaja().subscribe({
      next: (response) => {
        this.oficinaSeleccionada = null;
        this.snackBar.open(`${response.mensaje}`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.snackBar.open(`${error.error.error}`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        console.error('Error al liberar la caja:', error);
        // Muestra un mensaje de error al usuario
      },
    });
  }

  getAtendidaLabel(value: string): string {
    if (value === 'N') {
      return 'No atendida';
    } else if (value === 'S') {
      return 'Atendida';
    } else if (value === 'C') {
      return 'Cancelada';
    }
    return 'Desconocido'; // Por si llega algún valor inesperado
  }
  atendiendoCitaId: number | null = null; // Almacena el ID de la cita que está siendo atendida

  atenderCita(cita: any): void {
    this.citasService
      .actualizarEstadoCita(cita.id_cita, 'D' )
      .subscribe({
        next: () => {
          this.snackBar.open(`La cita ${cita.id_cita} está siendo atendida.`, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
  
          this.atendiendoCitaId = cita.id_cita;;
        },
        error: (err) => {
          this.snackBar.open('Error al atender la cita.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
  }
  

  terminarCita(cita: any): void {
    this.citasService
      .actualizarEstadoCita(cita.id_cita , 'S' )
      .subscribe({
        next: () => {
          this.snackBar.open(`La cita ${cita.id_cita} ha finalizado.`, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          
          this.atendiendoCitaId = null;
        },
        error: (err) => {
          console.error('Error al terminar la cita:', err);
          this.snackBar.open('Error al finalizar la cita.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
  }

  openDialog(cita: Cita): void {
    const dialogRef = this.dialog.open(CitaDialogComponent, {
      width: '600px',
      data: { cita },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadCitas();
      }
    });
  }

  cargarPrioritarias(): void {
    if (!this.oficinaSeleccionada) {
      this.snackBar.open('Por favor selecciona un módulo primero.', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    this.citasService.listarCitasPrioritariasFuncionario().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.citas)) {
          const citasFiltradas = data.citas.filter(
            (cita: Cita) => cita.atendida && cita.atendida !== 'S'
          );

          this.citasPrioritarias = citasFiltradas;
        } else {
          this.citas = [];
        }
      },
      error: (err) => {
        console.error('Error al cargar citas por módulo:', err);
        this.snackBar.open('Error al cargar citas para el módulo.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  cargarCitas(): void {
    if (!this.oficinaSeleccionada) {
      this.snackBar.open('Por favor selecciona un módulo primero.', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    this.citasService.listarCitasPorCaja().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.citas)) {
          const citasFiltradas = data.citas.filter(
            (cita: Cita) => cita.atendida && cita.atendida !== 'S'
          );

          this.citas = citasFiltradas;
        } else {
          this.citas = [];
        }
      },
      error: (err) => {
        console.error('Error al cargar citas por módulo:', err);
        this.snackBar.open('Error al cargar citas para el módulo.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  reloadCitas(): void {
    this.cargarCitas();
    this.cargarPrioritarias();
  }
}
