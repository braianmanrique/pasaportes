import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { LoginForm } from '../interfaces/login-form.interface.';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email: ''})

  constructor(private http: HttpClient) { }

  loginUsuario(form: LoginForm):Observable<User>{
    return this.http.get<User>('./../../assets/user.json').pipe(
      tap((userData:User) => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('Se ha producido error', error.error);
    }else{
      console.error('Backend retorno codigo de estado', error.status, error.error)
    }
    return throwError(()=> new Error('Algo fallo'));
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }
  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable()
  }

}
