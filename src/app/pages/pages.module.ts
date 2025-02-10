import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
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
import { MaterialModule } from '../material/material.module';
import { FormAddEditComponent } from './formalizadores/form-add-edit/form-add-edit.component';
import { ReportsComponent } from './reports/reports.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SeleccionarModuloComponent } from './seleccionar-modulo/seleccionar-modulo.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsSectionComponentComponent } from './reports/charts-section-component/charts-section-component.component';
import { AtenderCitaComponent } from './atender-cita/atender-cita.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReporteAdminPasaportesComponent } from './reports/reporte-admin-pasaportes/reporte-admin-pasaportes.component';
import { ReporteFormalizadorComponent } from './reports/reporte-formalizador/reporte-formalizador.component';
import { VisorComponent } from './visor/visor/visor.component';
@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [ 
    PagesComponent,
    DashboardComponent,
    AdminComponent,
    BodyComponent,
    CitasComponent,
    CitasPrioritariasComponent,
    FormalizadoresComponent,
    FormAddEditComponent,
    ReportsComponent,
    SeleccionarModuloComponent,
    ChartsSectionComponentComponent,
    AtenderCitaComponent,
    ReporteAdminPasaportesComponent,
    ReporteFormalizadorComponent,
    VisorComponent
  ],
  exports:[ 
    PagesComponent,
    DashboardComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    
  ],
  providers: [MatDatepickerModule],
})
export class PagesModule { }
