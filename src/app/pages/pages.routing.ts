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

const routes: Routes = [
    {path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
     children:[ 
     { path: '',redirectTo: 'dashboard', pathMatch: 'full'},
     { path: 'dashboard', component: DashboardComponent },

     { path: 'admin', component: AdminComponent  },
     { path: 'citas', component: CitasComponent  },
     { path: 'citas-prioritarias', component: CitasPrioritariasComponent  },
     { path: 'formalizadores', component: FormalizadoresComponent  },
     { path: 'reportes', component: ReportsComponent },
    ]
  },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
