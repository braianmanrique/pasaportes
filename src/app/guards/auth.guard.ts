import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsuarioService);
  const router = inject(Router);

  return true;
  // return userService.validarToken().pipe(
  //   tap( (isAuthenticated) => {
  //     if(!isAuthenticated){
  //       router.navigateByUrl('/login');
  //     } 
  //   })
  // );  
};
