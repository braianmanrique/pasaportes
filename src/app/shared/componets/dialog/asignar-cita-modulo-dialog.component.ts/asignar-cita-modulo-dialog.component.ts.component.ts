import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CitasService } from '../../../../services/citas/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-asignar-cita-modulo-dialog.component.ts',
  templateUrl: './asignar-cita-modulo-dialog.component.ts.component.html',
  styleUrl: './asignar-cita-modulo-dialog.component.ts.component.scss',
})
export class AsignarCitaModuloDialogComponentTsComponent {
  constructor(
    public dialogRef: MatDialogRef<AsignarCitaModuloDialogComponentTsComponent>,
    public citasService: CitasService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  estadoIngreso: string | null = null;

  onSave(): void {
    if (this.estadoIngreso === null) {
      this.snackBar.open('Por favor selecciona un número de caja', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    if (this.data.tipo !== 'prioritarias') {
      this.citasService
        .actualizarEstadoCita(this.data.cita.id_cita, this.estadoIngreso)
        .subscribe({
          next: (res) => {
            console.log('Cita ingresada con éxito:', res);
            this.snackBar.open('Cita ingresada con éxito', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error al seleccionar la caja', err);
            this.snackBar.open('Error al asignar la caja', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
        });
    }else {
      this.citasService
      .actualizarEstadoCitaPrioritaria(this.data.cita.id_cita, this.estadoIngreso)
      .subscribe({
        next: (res) => {
          console.log('Cita prioritaria ingresada con éxito:', res);
          this.snackBar.open('Cita ingresada con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al seleccionar la caja', err);
          this.snackBar.open('Error al asignar la caja', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
