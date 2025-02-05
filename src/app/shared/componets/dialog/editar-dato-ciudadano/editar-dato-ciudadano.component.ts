import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CitasService } from '../../../../services/citas/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-dato-ciudadano',
  templateUrl: './editar-dato-ciudadano.component.html',
  styleUrl: './editar-dato-ciudadano.component.scss'
})
export class EditarDatoCiudadanoComponent {
  ciudadano: any;
  
  constructor(
    public dialogRef: MatDialogRef<EditarDatoCiudadanoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: CitasService,
    private snackBar: MatSnackBar
  ) {
    this.ciudadano = { ...data };
  }

  guardarCambios() {
    const idCiudadanoActual = this.data.cedula;


    const payload = {
      id_ciudadano: this.ciudadano.cedula, 
      nombre_completo: this.ciudadano.nombre_citizen
    };
    this.usuarioService.actualizarUsuario(idCiudadanoActual, payload).subscribe({
      next: () => {
        this.snackBar.open('Información actualizada con éxito', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(this.ciudadano); // Retorna los datos actualizados
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        this.snackBar.open('Error al actualizar información', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
