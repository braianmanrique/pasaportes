import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { BodyComponent } from './body/body.component';
import { CitasComponent } from './citas/citas.component';
import { CitasPrioritariasComponent } from './citas-prioritarias/citas-prioritarias.component';
import { FormalizadoresComponent } from './formalizadores/formalizadores.component';

@NgModule({
  declarations: [ 
    PagesComponent,
    DashboardComponent,
    AdminComponent,
    BodyComponent,
    CitasComponent,
    CitasPrioritariasComponent,
    FormalizadoresComponent
  ],
  exports:[ 
    PagesComponent,
    DashboardComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
