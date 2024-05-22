import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  // path : '/dashboard' PagesRouting
    // path : '/auth' Auth Routing
  // {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

 {path: '**', component: NopagefoundComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule

   ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
