import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CitaDialogComponent } from './componets/dialog/cita-dialog/cita-dialog.component';
import { CreateAppointmentFormComponent } from './componets/dialog/create-appointment-form/create-appointment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmaModuloDialogComponentTsComponent } from './componets/dialog/confirma-modulo-dialog.component.ts/confirma-modulo-dialog.component.ts.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    CitaDialogComponent,
    CreateAppointmentFormComponent,
    ConfirmaModuloDialogComponentTsComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
    
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,

  ]
})
export class SharedModule { }
