import { Component } from '@angular/core';
import { CreateAppointmentFormComponent } from '../../shared/componets/dialog/create-appointment-form/create-appointment-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ReasignarCitaDialogComponent } from '../../shared/componets/dialog/reasignar-cita-dialog/reasignar-cita-dialog.component';

@Component({
  selector: 'app-citas-prioritarias',
  templateUrl: './citas-prioritarias.component.html',
  styleUrls: ['./citas-prioritarias.component.scss']
})
export class CitasPrioritariasComponent {
  role: string = 'admin';
  constructor(private dialog: MatDialog) {}

openCreateAppointmentDialog() {
  const dialogRef = this.dialog.open(CreateAppointmentFormComponent, {
    width: '600px',
    maxHeight: '90vh', 
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Datos recibidos del modal:', result);
    }
  });
}

citas = [
  {
    id_cita: 13,
    id_citizen: 70,
    estado_ingreso: 'N',
    fec_registro: '2025-01-21 00:00:00',
    fecha_atencion: null,
    celular: '5730745388266@c.us'
  },
  {
    id_cita: 11,
    id_citizen: 68,
    estado_ingreso: 'N',
    fec_registro: '2025-01-21 00:00:00',
    fecha_atencion: null,
    celular: '5730453887266@c.us'
  }
];

openReasignAppointmentDialog() {
  const dialogRef = this.dialog.open(ReasignarCitaDialogComponent, {
    width: '600px',
    maxHeight: '90vh', 
    disableClose: true,
    data: { citas: this.citas }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Datos recibidos del modal:', result);
    }
  });
}
}
