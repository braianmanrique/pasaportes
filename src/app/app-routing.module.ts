import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // {
  //   path: 'agendamiento',
  //   loadChildren: () =>
  //     import('./agendamiento/agendamiento.module').then(
  //       (m) => m.AgendamientoModule
  //     ),
  //   canActivate: [RoleGuard],
  //   data: { role: 'agendamiento' },
  // },
  // {
  //   path: 'tesoreria',
  //   loadChildren: () =>
  //     import('./tesoreria/tesoreria.module').then((m) => m.TesoreriaModule),
  //   canActivate: [RoleGuard],
  //   data: { role: 'tesoreria' },
  // },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', component: NopagefoundComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
