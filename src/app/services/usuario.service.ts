import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { LoginForm } from '../interfaces/login-form.interface.';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  loginUsuario(form: LoginForm){
    console.log('Inicio de Sesion')
    return this.http.post(`localhost`, form);
  }

}
