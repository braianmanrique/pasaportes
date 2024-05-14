import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { LoginForm } from '../interfaces/login-form.interface.';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, password: '', type: ''})

  constructor(private http: HttpClient, private router: Router ) { 
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserData = new BehaviorSubject<User>(storedUser ? JSON.parse(storedUser) : {id:0, password: '', type: ''});

  }

  validarToken(){
    const token = localStorage.getItem('token') || '';
    return this.http.get(``, {
      headers: {
        'x-token': token
      }
    })

  }

  loginUsuario(form: LoginForm):Observable<User>{
    return this.http.get<User>('./../../assets/user.json').pipe(
      tap((userData:User) => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }
  
  login(form: LoginForm): Observable<boolean> {
    return this.http.get<any[]>('assets/user.json').pipe(
      map(userData => {
        
        const user = userData.find(u => u.username === form.username && u.password === form.password);
        if (user) {
          // Si el usuario es encontrado, el login es exitoso
          this.currentUserData.next(user);

          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        } else {
          // Si el usuario no es encontrado, el login falla
          return false;
        }
      })
    );
  }


  logoutUsuario() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login')
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
