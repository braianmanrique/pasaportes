import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userRole: string = '';
  constructor(private usuarioService: UsuarioService) {}
  ngOnInit(): void {
    this.userRole = this.usuarioService.getUserRole();
  }

  logout() {
    this.usuarioService.logoutUsuario();
  }
}
