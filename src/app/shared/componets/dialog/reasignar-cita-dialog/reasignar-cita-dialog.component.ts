// reasignar-cita-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reasignar-cita-dialog',
  templateUrl: './reasignar-cita-dialog.component.html',
  styleUrls: ['./reasignar-cita-dialog.component.scss']
})
export class ReasignarCitaDialogComponent {
  reasignarForm: FormGroup;
  citas: any[] = []; // Lista de citas recibida desde el componente padre
  selectedCitas: any[] = []; // Lista de citas seleccionad
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ReasignarCitaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { citas: any[] }
  ) {
    // Inicializa las citas desde los datos recibidos
    this.citas = data.citas;

    // Configura el formulario
    this.reasignarForm = this.fb.group({
      fecha: ['', Validators.required]
    });
  }

  // Método para enviar la solicitud de reasignación
  reasignarCitas() {
    if (this.reasignarForm.valid) {
      const payload = {
        fecha: this.reasignarForm.value.fecha,
        citas: this.citas
      };

      this.http.post('https://backend-auth-log-project.onrender.com/api/usuarios/reagendar_citas/', payload)
        .subscribe({
          next: (response) => {
            alert('Citas reasignadas con éxito.');
            this.dialogRef.close(true); // Cierra el modal y devuelve un resultado
          },
          error: (err) => {
            alert('Error al reasignar citas.');
          }
        });
    } else {
      alert('Por favor selecciona una fecha válida.');
    }
  }

  // Método para cerrar el modal sin realizar acciones
  cancelar() {
    this.dialogRef.close(false);
  }
}
