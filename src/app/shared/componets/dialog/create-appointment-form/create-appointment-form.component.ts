import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CitasService } from '../../../../services/citas/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-appointment-form',
  templateUrl: './create-appointment-form.component.html',
  styleUrl: './create-appointment-form.component.scss'
})
export class CreateAppointmentFormComponent {
  appointmentForm: FormGroup;
  listaCualidades = [
    { id: 1, nombre: 'No' },
    { id: 2, nombre: 'Visual' },
    { id: 3, nombre: 'Auditivo' },
    { id: 4, nombre: 'Fisica' },
    { id: 5, nombre: 'PC' },
    { id: 6, nombre: 'Down' },
    { id: 7, nombre: 'Cognitivo' }
  ];
  listaTiposDocumento = [
    { id: '1', nombre: 'Cédula de Ciudadanía' },
    { id: '2', nombre: 'Tarjeta de Identidad' },
    { id: '3', nombre: 'Registro civil' },
  ];
  listaComunidades = [
  {id : 1 , nombre: 'Ninguna.'},
   {id:2 ,  nombre:  'Mayoritario.'},
  {id :3 , nombre: 'Afrocolombiano.'},
  {id:4 , nombre: 'Indigena.'},
  {id : 5 , nombre : 'Raizal.'},
  {id :6 , nombre : 'ROM (Gitano)'}
  ]
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateAppointmentFormComponent>,
    private citasService : CitasService,
    private snackBar: MatSnackBar
  ) {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      documentType: ['', Validators.required],
      identification: ['', Validators.required],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      cualities: ['', Validators.required],
      comunity: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.appointmentForm.invalid) return;

    const formValue = this.appointmentForm.value;
    const fecha: Date = formValue.date;
    const fechaCita = this.formatDateTime(fecha);
    
    const ciudadanoData = {
      nombre: formValue.name,
      celular: formValue.phone || '0000000000',
      mail: formValue.email || 'sin_correo@example.com',
      cedula: Number(formValue.identification),
      genero: formValue.gender,
      cualidades: formValue.cualities,
      comunidad: formValue.comunity,
      fec_cita : fechaCita
    };
    
    this.citasService.crearCiudadano(ciudadanoData)
    .subscribe({
      next: (res: any) => {
        const citaData = {
          cedula:  Number(formValue.identification),
          fec_cita: fechaCita
        };

        this.citasService.crearCitaPrioritaria(citaData)
          .subscribe({
            next: (resp: any) => {
              this.snackBar.open('Cita creada con éxito', 'Cerrar', {
                duration: 3000, 
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
              this.dialogRef.close(true); 
            },
            error: (err) => {
              console.error('Error al crear la cita prioritaria', err);
            }
          });
      },
      error: (err) => {
        console.error('Error al crear el ciudadano prioritario', err);
      }
    });
  }

  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = '10';
    const minute = '00';
    const second = '00';
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
}
