import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.usuarioService.getUserRole();
    const allowedRoles = route.data['roles'] as string[]; 

    const expectedRole = route.data['role'];

    if (allowedRoles && allowedRoles.includes(userRole)) {
      // Permitir acceso si el rol del usuario está en la lista
      return true;
    }

      // Redirigir según el rol del usuario si no tiene acceso a la ruta
      if (userRole === 'administrador_pasaportes') {
        this.router.navigate(['/agendamiento']); // Redirige a agendamiento
      } else if (userRole === 'tesoreria') {
        this.router.navigate(['/tesoreria']); // Redirige a tesorería
      } else {
        this.router.navigate(['/login']); // Si no tiene un rol válido, redirigir al login
      }
      return false;
    }
}