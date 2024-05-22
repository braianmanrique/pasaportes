import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
    
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,

  ]
})
export class SharedModule { }
