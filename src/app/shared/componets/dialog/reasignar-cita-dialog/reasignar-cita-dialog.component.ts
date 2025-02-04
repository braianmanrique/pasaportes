// reasignar-cita-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CitasService } from '../../../../services/citas/citas.service';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reasignar-cita-dialog',
  templateUrl: './reasignar-cita-dialog.component.html',
  styleUrls: ['./reasignar-cita-dialog.component.scss']
})
export class ReasignarCitaDialogComponent implements OnInit {
  reasignarForm: FormGroup;
  citas = new MatTableDataSource<any>(); // Cambiar el tipo a MatTableDataSource
  selectedCitas: any[] = []; // Lista de citas seleccionad
  
  displayedColumns: string[] = ['checkbox', 'id_cita', 'nombre_citizen', 'turn_desc']; // Columnas de la tabla
  minDate: Date ;
  maxDate: Date;
 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private citasService: CitasService,
    private dialogRef: MatDialogRef<ReasignarCitaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { citas: any[] }
  ) {
    this.minDate = moment().add(1, 'days').toDate(); 
    this.maxDate = moment().add(3, 'days').toDate(); 

    this.reasignarForm = this.fb.group({
      fecha: ['', Validators.required]
    });
  }

  
  ngOnInit() {
    this.loadCitas();
  }

  loadCitas() {
    this.citasService.listarCitas().subscribe({
      next: (response: any) => {
        if(response.citas.length === 0 ) {
          this.snackBar.open('No hay citas para reasignar.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
        const citasFiltradas = response.citas.filter((cita: any) => cita.estado_ingreso === 'N');
        this.citas.data = citasFiltradas; 
        console.log(this.citas.data); 
      },
      error: () => {
        alert('Error al cargar las citas.');
      }
    });
  }


  toggleCitaSelection(cita: any, isChecked: boolean) {
    if (isChecked) {
      this.selectedCitas.push(cita);
    } else {
      this.selectedCitas = this.selectedCitas.filter((item) => item.id_cita !== cita.id_cita);
      this.allSelected = false; // Si se desmarca una cita, deshabilitamos "Seleccionar Todos"
    }
  }
  allSelected: boolean = false;

  toggleAllCitas(isChecked: boolean) {
    this.allSelected = isChecked;
    this.selectedCitas = isChecked ? [...this.citas.data] : [];
  }

  reasignarCitas() {
    if (this.reasignarForm.valid) {
      const fechaSeleccionada = this.reasignarForm.value.fecha;
       if (moment(fechaSeleccionada).isBefore(this.minDate) || moment(fechaSeleccionada).isAfter(this.maxDate)) {
        alert('Por favor selecciona una fecha válida dentro del rango permitido.');
        return;
      }
      
      const payload = {
        fecha: this.reasignarForm.value.fecha,
        citas: this.selectedCitas
      };

     this.citasService.reasignarCitas(payload).subscribe({
          next: (response) => {
            this.snackBar.open('Citas reasignadas con éxito.', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
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
