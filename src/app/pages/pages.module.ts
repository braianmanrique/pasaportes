import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [ 
    PagesComponent,
    DashboardComponent,
    AdminComponent
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
