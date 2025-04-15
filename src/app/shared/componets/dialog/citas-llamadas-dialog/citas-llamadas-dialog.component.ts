import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CitasService } from '../../../../services/citas/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-citas-llamadas-dialog',
  templateUrl: './citas-llamadas-dialog.component.html',
  styleUrl: './citas-llamadas-dialog.component.scss',
})
export class CitasLlamadasDialogComponent {
  citasEnLlamada: any[] = [];
  isPrioritaria: any;

  constructor(
    public dialogRef: MatDialogRef<CitasLlamadasDialogComponent>,
    private citasService: CitasService,
    @Inject(MAT_DIALOG_DATA)
    public data: { citasLlamadas: any[]; isPrioritaria: boolean },
    private snackBar: MatSnackBar
  ) {
    this.citasEnLlamada = data.citasLlamadas || [];

    this.isPrioritaria = data.isPrioritaria;
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  cita: any;

  atenderCita(cita: any) {
    const actualizarEstado = this.isPrioritaria
      ? this.citasService.actualizarEstadoCitaPrioritaria(cita.id_cita, 'D')
      : this.citasService.actualizarEstadoCita(cita.id_cita, 'D');

    actualizarEstado.subscribe({
      next: () => {
        this.snackBar.open(`Atendiendo a ${cita.nombre_citizen}.`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        const index = this.citasEnLlamada.findIndex(
          (c) => c.id_cita === cita.id_cita
        );
        if (index !== -1) {
          this.citasEnLlamada[index] = {
            ...this.citasEnLlamada[index],
            atendida: 'D',
          };
        }
      },
      error: (err) => {
        this.snackBar.open(err, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  esEsperaCita(cita: any) {
    const actualizarEstado = this.isPrioritaria
      ? this.citasService.actualizarEstadoCitaPrioritaria(cita.id_cita, 'E')
      : this.citasService.actualizarEstadoCita(cita.id_cita, 'E');

    actualizarEstado.subscribe({
      next: () => {
        this.snackBar.open(
          `Se ha puesto en espera a ${cita.nombre_citizen}.`,
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        this.eliminarCitaDelModal(cita.id_cita);
      },
      error: (err) => {
        this.snackBar.open('Error al actualizar la cita.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  eliminarCitaDelModal(idCita: number) {
    this.citasEnLlamada = this.citasEnLlamada.filter(
      (c) => c.id_cita !== idCita
    );

    if (this.citasEnLlamada.length === 0) {
      this.closeDialog();
    }
  }
  terminarCita(cita: any) {
    const actualizarEstado = this.isPrioritaria
      ? this.citasService.actualizarEstadoCitaPrioritaria(cita.id_cita, 'A')
      : this.citasService.actualizarEstadoCita(cita.id_cita, 'A');

    actualizarEstado.subscribe({
      next: () => {
        this.snackBar.open(`La cita ha finalizado.`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.eliminarCitaDelModal(cita.id_cita);
      },
      error: (err) => {
        this.snackBar.open('Error al finalizar la cita.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  noAtenderCita(cita: any) {
    const actualizarEstado = this.isPrioritaria
      ? this.citasService.actualizarEstadoCitaPrioritaria(cita.id_cita, 'N')
      : this.citasService.actualizarEstadoCita(cita.id_cita, 'N');

    actualizarEstado.subscribe({
      next: () => {
        this.snackBar.open(
          `${cita.nombre_citizen} no será atendida.`,
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        this.eliminarCitaDelModal(cita.id_cita);
      },
      error: (err) => {
        console.error('Error al marcar la cita como no atendida:', err);
        this.snackBar.open('Error al actualizar la cita.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  trackByCita(index: number, cita: any): number {
    return cita.id_cita;
  }
  getAtendidaLabel(value: string): string {
    if (value === 'N') {
      return 'No atendida';
    } else if (value === 'S') {
      return 'Atendida';
    } else if (value === 'L') {
      return 'Llamando';
    } else if (value === 'D') {
      return 'Atendiendo';
    } else if (value === 'C') {
      return 'Cancelada';
    } else if (value === 'E') {
      return 'En espera';
    }
    return 'Desconocido'; 
  }
}
