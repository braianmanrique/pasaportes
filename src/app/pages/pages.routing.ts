import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../guards/auth.guard';
import { CitasComponent } from './citas/citas.component';

const routes: Routes = [
    {path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
     children:[ 
     { path: '',redirectTo: 'dashboard', pathMatch: 'full'},
     { path: 'dashboard', component: DashboardComponent },

     { path: 'admin', component: AdminComponent  },
     { path: 'citas', component: CitasComponent  },


    ]
  },
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
