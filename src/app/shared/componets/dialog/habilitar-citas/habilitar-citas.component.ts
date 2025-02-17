import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { CitasService } from '../../../../services/citas/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-habilitar-citas',
  templateUrl: './habilitar-citas.component.html',
  styleUrl: './habilitar-citas.component.scss',
})
export class HabilitarCitasComponent {
  habilitarForm: FormGroup;
  minDate = new Date();
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HabilitarCitasComponent>,
    private citasService : CitasService,
    private snackBar: MatSnackBar,
  ) {
    this.habilitarForm = this.fb.group({
      fecha: ['', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  habilitarCitas(): void {
    if (!this.habilitarForm.valid) return;

    const fechaSeleccionada = moment(this.habilitarForm.value.fecha).format(
      'DD/MM/YYYY'
    );
    const data = {
      "fecha" : fechaSeleccionada
    }
    this.citasService.habilitarCitas(data).subscribe({
      next: () => {
        this.snackBar.open('Citas habilitada con éxito.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.dialogRef.close(true); 
      },
      error: (err) => {
        alert('Error al reasignar citas.');
      }
    })
   
  }
}
