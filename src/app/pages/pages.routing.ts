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

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'admin', component: AdminComponent },
      {
        path: 'citas',
        component: CitasComponent,
        canActivate: [RoleGuard],
        data: { roles: ['atencion_pasaporte', 'administrador_pasaportes'] },
      },
      {
        path: 'citas-prioritarias',
        component: CitasPrioritariasComponent,
        canActivate: [RoleGuard],
        data: { roles: ['atencion_pasaporte', 'administrador_pasaportes'] },
      },
      { path: 'formalizadores', component: FormalizadoresComponent },
      {
        path: 'reportes',
        component: ReportsComponent,
        data: { roles: [ 'administrador_pasaportes'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
