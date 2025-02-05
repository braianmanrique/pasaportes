import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private apiUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/listar_dates/';

  private citasPrioritarias =
    'https://backend-auth-log-project.onrender.com/api/usuarios/listar_citas_prioritarias_asig/';
  private apiCitas_Ganadero =
    'https://backend-auth-log-project.onrender.com/api/usuarios/listar_dates_carnet/';

  private apiCitaPrioritariaUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/crear_cita_prioritaria/';
  private apiCiudadanoUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/crear_ciudadano_prioritario/';

  private seleccionarCajaUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/seleccionar_caja/';
  private citasModuloUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/citas_modulo_caja/';

  private citasPrioritariasModuloUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/listar_citasprioritarias_modulo/';

  private liberarCitasUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/liberar_caja/';
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Token ${token}` });
  }

  listarCitas(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  listarCitasPrioritarias(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.citasPrioritarias, { headers });
  }

  listarCitasCarnet(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiCitas_Ganadero, { headers });
  }

  crearCiudadano(ciudadanoData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(this.apiCiudadanoUrl, ciudadanoData, { headers });
  }

  actualizarUsuario(idCiudadanoActual: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(
      `${this.baseUrl}actualizar_info_usuario_ingreso/${idCiudadanoActual}/`,
      data , {headers}
    );
  }
  crearCitaPrioritaria(citaData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(this.apiCitaPrioritariaUrl, citaData, { headers });
  }

  seleccionarCaja(numeroCaja: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(
      this.seleccionarCajaUrl,
      { numero_caja: numeroCaja },
      { headers }
    );
  }

  liberarCaja(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(this.liberarCitasUrl, {}, { headers });
  }

  signarModulo(idCita: number, numeroCaja: number): Observable<any> {
    const headers = this.getHeaders();
    const body = { numero_caja: numeroCaja };
    return this.http.put(
      `https://backend-auth-log-project.onrender.com/api/usuarios/asignar-modulo/${idCita}/`,
      body,
      { headers }
    );
  }

  listarCitasPrioritariasFuncionario(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.citasPrioritariasModuloUrl, { headers });
  }

  listarCitasPorCaja(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.citasModuloUrl, { headers });
  }

  actualizarEstadoCita(idCita: number, atendida: string): Observable<any> {
    const headers = this.getHeaders();
    const body = {
      nuevo_estado: atendida,
    };
    return this.http.post(
      `https://backend-auth-log-project.onrender.com/api/usuarios/update_atendida_cita_modulo/${idCita}/`,
      body,
      { headers }
    );
  }

  ingresarCita(idCita: number, atendida: string): Observable<any> {
    const headers = this.getHeaders();
    const body = {
      estado_ingreso: atendida,
    };
    return this.http.put(
      `https://backend-auth-log-project.onrender.com/api/usuarios/update_estado_cita/${idCita}/`,
      body,
      { headers }
    );
  }
  private baseUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/';

  actualizarEstadoCitaPrioritaria(idCita: number, body: any): Observable<any> {
    const url = `${this.baseUrl}update_atendida_citaprioritaria_modulo/${idCita}/`;
    const headers = this.getHeaders();

    return this.http.put<any>(url, body, { headers });
  }

  actualizarCita(idCita: number, estado: string): Observable<any> {
    const headers = this.getHeaders();
    const body = { nuevo_estado: estado };
    return this.http.post(
      `https://backend-auth-log-project.onrender.com/api/usuarios/update_atendida_cita_modulo/${idCita}/`,
      body,
      { headers }
    );
  }

  actualizarEstadoCitaCarnet(idCita: number, estado: string): Observable<any> {
    const headers = this.getHeaders();
    const body = { atendida: estado };
    return this.http.put(
      `https://backend-auth-log-project.onrender.com/api/usuarios/update_estado_carnet/${idCita}/`,
      body,
      { headers }
    );
  }

  reasignarCitas(payload: any) {
    debugger;
    const headers = this.getHeaders();

    return this.http.post(
      'https://backend-auth-log-project.onrender.com/api/usuarios/reagendar_citas/',
      payload,
      { headers }
    );
  }
}
