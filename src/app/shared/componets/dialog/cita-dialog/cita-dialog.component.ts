import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CitasService } from '../../../../services/citas/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../../../services/usuario.service';
@Component({
  selector: 'app-cita-dialog',
  templateUrl: './cita-dialog.component.html',
  styleUrl: './cita-dialog.component.scss'
})
export class CitaDialogComponent {
  nuevoEstado: string | null = null; 

  constructor(
    public dialogRef: MatDialogRef<CitaDialogComponent>,
    public citasService: CitasService,
    private usuarioService : UsuarioService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    if (!this.nuevoEstado) {
    
      return;
    }
    const userRole = this.usuarioService.getUserRole();
    const idCita = this.data.cita.id_cita;
    const estado = this.nuevoEstado;
    
    if (userRole === 'atencion_ganadero') {
      this.citasService.actualizarEstadoCitaCarnet(idCita, estado).subscribe({
        next: (res) => {
          this.handleSuccess(res, estado);
        },
        error: (err) => {
          this.handleError(err);
        },
      });
    } else if (userRole === 'atencion_pasaporte') {
        this.citasService.actualizarCita(idCita, estado).subscribe({

        next: (res) => {
          this.handleSuccess(res, estado);
        },
        error: (err) => {
          this.handleError(err);
        },
      });
    } else {
      this.snackBar.open('No tienes permisos para actualizar esta cita.', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }


  }
  onCancel(): void {
    this.dialogRef.close();
  }

  private handleSuccess(res: any, estado: string): void {
    console.log('Estado actualizado con éxito:', res);
    this.snackBar.open('Cita actualizada con éxito', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    this.dialogRef.close(estado);
  }
  
  // Manejar errores
  private handleError(err: any): void {
    console.error('Error al actualizar el estado:', err);
    this.snackBar.open('Error al actualizar la cita. Intenta nuevamente.', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
