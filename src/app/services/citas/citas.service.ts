import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private apiUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/listar_dates/';
  private apiCitaPrioritariaUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/crear_cita_prioritaria/';
  private apiCiudadanoUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/crear_ciudadano_prioritario/';
  constructor(private http: HttpClient) {}

  listarCitas(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    });

    return this.http.get(this.apiUrl, { headers });
  }

  crearCiudadano(ciudadanoData: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    });

    return this.http.post(this.apiCiudadanoUrl, ciudadanoData, { headers });
  }

  crearCitaPrioritaria(citaData: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    });

    return this.http.post(this.apiCitaPrioritariaUrl, citaData, { headers });
  }
}
