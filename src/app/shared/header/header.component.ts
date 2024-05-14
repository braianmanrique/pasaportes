import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private usuarioService: UsuarioService){


  } 

  logout(){
    this.usuarioService.logoutUsuario();
  }

}
