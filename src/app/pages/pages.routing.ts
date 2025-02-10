import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../guards/auth.guard';
import { CitasComponent } from './citas/citas.component';
import { CitasPrioritariasComponent } from './citas-prioritarias/citas-prioritarias.component';
import { FormalizadoresComponent } from './formalizadores/formalizadores.component';
import { ReportsComponent } from './reports/reports.component';
import { RoleGuard } from '../guards/role.guard';
import { SeleccionarModuloComponent } from './seleccionar-modulo/seleccionar-modulo.component';
import { AtenderCitaComponent } from './atender-cita/atender-cita.component';
import { VisorComponent } from './visor/visor/visor.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'atender-cita/:id', component: AtenderCitaComponent },
      { path: 'admin', component: AdminComponent },
      {
        path: 'citas',
        component: CitasComponent,
        canActivate: [RoleGuard],
        data: { roles: ['asignador','atencion_ganadero'] },
      },
      {
        path: 'citas-modulo',
        component: SeleccionarModuloComponent,
        canActivate: [RoleGuard],
        data: { roles: ['atencion_pasaporte'] },
      },
      {
        path: 'citas-prioritarias',
        component: CitasPrioritariasComponent,
        canActivate: [RoleGuard],
        data: { roles: ['administrador_pasaportes'] },
      },
      { path: 'formalizadores', component: FormalizadoresComponent },
      {
        path: 'reportes',
        component: ReportsComponent,
        data: { roles: [ 'administrador_pasaportes','administrador_juntas','administrador_sistema','atencion_pasaporte'] },
      },
      {
        path: 'visor',
        component: VisorComponent,
        canActivate: [RoleGuard],
        data: { roles: ['visor'] }, // Solo accesible para el rol "visor"
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
