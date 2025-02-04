import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormalizadoresService {
  private baseUrl = 'https://backend-auth-log-project.onrender.com/api/usuarios/listarPassport/';

  private baseUrlRegister = 'https://backend-auth-log-project.onrender.com/api/usuarios/register/';

  constructor(private http:HttpClient) { }

 
  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Token ${token}` });
  }

  registerFormalizador(data: any): Observable<any> {
      const headers = this.getHeaders();

    return this.http.post<any>(this.baseUrlRegister, data, { headers });
  }
  
  getFormalizadores(): Observable<any[]> {
    const headers = this.getHeaders();

    return this.http.get<any[]>(this.baseUrl, {headers});
  }
}
