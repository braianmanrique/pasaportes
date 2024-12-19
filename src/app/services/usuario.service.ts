import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { LoginForm } from '../interfaces/login-form.interface.';
import {
  Observable,
  BehaviorSubject,
  tap,
 
} from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userRole: string | null = null;  
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: 0,
    password: '',
    type: '',
  });
  private loggedInUser: any = null;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserData = new BehaviorSubject<User>(
      storedUser ? JSON.parse(storedUser) : { id: 0, password: '', type: '' }
    );
  }

  setRole(role: string) {
    this.userRole = role;
  }

  // Método para obtener el rol del usuario
  getRole(): string | null {
    return this.userRole;
  }

  hasRole(role: string): boolean {
    return this.userRole === role;
  }

  getUserRole(): string  {
    return localStorage.getItem('userRole') || '';
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.setRole(user.rol);
    this.currentUserLoginOn.next(true);
  }
  
  isAuthenticated(): boolean {
    return this.getUserRole() !== null;
  }

  logoutUsuario() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }
  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  loginUsuario(data: { username: string; password: string }) {
    return this.http.post('https://backend-auth-log-project.onrender.com/api/usuarios/login/', data).pipe(
      tap((response : any) => {
        localStorage.setItem('token', response.token);
      }),
    )
  }


}
