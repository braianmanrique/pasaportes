import { Component } from '@angular/core';
import { CreateAppointmentFormComponent } from '../../shared/componets/dialog/create-appointment-form/create-appointment-form.component';
import { MatDialog } from '@angular/material/dialog';

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
}
