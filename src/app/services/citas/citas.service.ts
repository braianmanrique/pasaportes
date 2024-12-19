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

    private seleccionarCajaUrl = 'https://backend-auth-log-project.onrender.com/api/usuarios/seleccionar_caja/';
  private citasPorModuloUrl = 'https://backend-auth-log-project.onrender.com/api/usuarios/citas_por_modulo_caja/';
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ 'Authorization': `Token ${token}` });
  }

  listarCitas(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get(this.apiUrl, { headers });
  }

  crearCiudadano(ciudadanoData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(this.apiCiudadanoUrl, ciudadanoData, { headers });
  }

  crearCitaPrioritaria(citaData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(this.apiCitaPrioritariaUrl, citaData, { headers });
  }

  seleccionarCaja(numeroCaja: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.seleccionarCajaUrl, { numero_caja: numeroCaja }, { headers });
  }

  listarCitasPorCaja(numeroCaja: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.citasPorModuloUrl + '?numero_caja=' + numeroCaja, { headers });
  }
}
