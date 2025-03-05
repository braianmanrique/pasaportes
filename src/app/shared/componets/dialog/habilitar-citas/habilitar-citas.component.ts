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
  turnosHabilitados: any[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HabilitarCitasComponent>,
    private citasService: CitasService,
    private snackBar: MatSnackBar
  ) {
    this.habilitarForm = this.fb.group({
      fecha: ['', Validators.required],
      habilitarMediaJornada: [false],
    });
  }

  ngOnInit(): void {
    this.obtenerTurnosHabilitados();
  }

  obtenerTurnosHabilitados(): void {
    this.citasService.listarTurnosCitasHabilitados().subscribe({
      next: (response: any) => {
        this.turnosHabilitados = response.seguimientos;
      },
      error: () => {
        this.snackBar.open('Error al cargar turnos habilitados.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
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
    const habilitarMediaJornada =
      this.habilitarForm.value.habilitarMediaJornada;

    const data = {
      fecha: fechaSeleccionada,
    };

    const servicio = habilitarMediaJornada
      ? this.citasService.habilitarCitasMediaJornada(data)
      : this.citasService.habilitarCitas(data);

    servicio.subscribe({
      next: () => {
        this.snackBar.open('Citas habilitadas con éxito.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.dialogRef.close(true);
      },
      error: () => {
        alert('Error al habilitar citas.');
      },
    });
  }
}
