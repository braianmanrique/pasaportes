import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private baseUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios/';

  private endpoints = {
    listarCitas: 'listar_dates/',
    listarCitasPrioritarias: 'listar_citas_prioritarias_asig/',
    listarCitasCarnet: 'listar_dates_carnet/',
    crearCitaPrioritaria: 'crear_cita_prioritaria/',
    crearCiudadano: 'crear_ciudadano_prioritario/',
    seleccionarCaja: 'seleccionar_caja/',
    liberarCaja: 'liberar_caja/',
    asignarModulo: 'asignar-modulo/',
    listarCitasModulo: 'citas_modulo_caja/',
    listarCitasPrioritariasModulo: 'listar_citasprioritarias_modulo/',
    updateCitaModulo: 'update_atendida_cita_modulo/',
    updateEstadoCita: 'update_estado_cita/',
    updateEstadoCitaPrioritaria: 'update_atendida_citaprioritaria_modulo/',
    ingresarEstadoCitaPrioritaria: 'update_estado_cita_prioritaria/',
    updateEstadoCarnet: 'update_estado_carnet/',
    actualizarUsuario: 'actualizar_info_usuario_ingreso/',
    reagendarCitas: 'reagendar_citas/',
    listarCitasLlamando: 'listar_citas_llamada_atendiendo_caja',
    listarCitasPrioritariasLlamando:
      'listar_citas_llamada_atendiendo_prioritarias_caja',
    listarCitasVisor: 'listar_citas_visor/',
    listarCitasPrioritariasVisor: 'listar_citas_prioritarias_llamando_visor',
    habilitarCitas: 'crear_turnos_citas/',
    habilitarCitasMediaJornada: 'crear_turnos_citas_media_jornada/',
    listarHistoriaTurnos: 'listar_turnos_citas_habilitados_publico',
  };

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Token ${token}` });
  }

  private request<T>(
    method: 'GET' | 'POST' | 'PUT',
    endpoint: string,
    body?: any
  ): Observable<T> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}${endpoint}`;

    switch (method) {
      case 'GET':
        return this.http.get<T>(url, { headers });
      case 'POST':
        return this.http.post<T>(url, body, { headers });
      case 'PUT':
        return this.http.put<T>(url, body, { headers });
      default:
        throw new Error('Método HTTP no soportado');
    }
  }

  listarCitas(): Observable<any> {
    return this.request('GET', this.endpoints.listarCitas);
  }

  listarCitasPrioritarias(): Observable<any> {
    return this.request('GET', this.endpoints.listarCitasPrioritarias);
  }

  listarCitasCarnet(): Observable<any> {
    return this.request('GET', this.endpoints.listarCitasCarnet);
  }

  crearCitaPrioritaria(citaData: any): Observable<any> {
    return this.request('POST', this.endpoints.crearCitaPrioritaria, citaData);
  }

  crearCiudadano(ciudadanoData: any): Observable<any> {
    return this.request('POST', this.endpoints.crearCiudadano, ciudadanoData);
  }

  seleccionarCaja(numeroCaja: number): Observable<any> {
    return this.request('POST', this.endpoints.seleccionarCaja, {
      numero_caja: numeroCaja,
    });
  }

  liberarCaja(): Observable<any> {
    return this.request('POST', this.endpoints.liberarCaja, {});
  }

  asignarModulo(idCita: number, numeroCaja: number): Observable<any> {
    return this.request('PUT', `${this.endpoints.asignarModulo}${idCita}/`, {
      numero_caja: numeroCaja,
    });
  }

  listarCitasPorCaja(): Observable<any> {
    return this.request('GET', this.endpoints.listarCitasModulo);
  }

  listarCitasPrioritariasFuncionario(): Observable<any> {
    return this.request('GET', this.endpoints.listarCitasPrioritariasModulo);
  }

  actualizarEstadoCita(idCita: number, estado: string): Observable<any> {
    return this.request(
      'POST',
      `${this.endpoints.updateCitaModulo}${idCita}/`,
      { nuevo_estado: estado }
    );
  }

  actualizarCita(idCita: number, estado: string): Observable<any> {
    return this.request(
      'POST',
      `${this.endpoints.updateCitaModulo}${idCita}/`,
      { nuevo_estado: estado }
    );
  }

  actualizarEstadoCitaPrioritaria(
    idCita: number,
    estado: any
  ): Observable<any> {
    return this.request(
      'POST',
      `${this.endpoints.updateEstadoCitaPrioritaria}${idCita}/`,
      { nuevo_estado: estado }
    );
  }

  getCitasEnEspera(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}listar_citas_espera_caja/`, {
      headers: headers,
    });
  }

  getCitasPrioritariasEnEspera(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(
      `${this.baseUrl}listar_citas_prioritarias_espera_caja/`,
      { headers: headers }
    );
  }

  ingresarCitaPrioritaria(idCita: number, atendida: string): Observable<any> {
    return this.request(
      'PUT',
      `${this.endpoints.ingresarEstadoCitaPrioritaria}${idCita}/`,
      { estado_ingreso: atendida }
    );
  }

  actualizarEstadoCitaCarnet(idCita: number, estado: string): Observable<any> {
    return this.request(
      'PUT',
      `${this.endpoints.updateEstadoCarnet}${idCita}/`,
      { atendida: estado }
    );
  }

  ingresarCita(idCita: number, atendida: string): Observable<any> {
    return this.request('PUT', `${this.endpoints.updateEstadoCita}${idCita}/`, {
      estado_ingreso: atendida,
    });
  }

  actualizarUsuario(idCiudadanoActual: string, data: any): Observable<any> {
    return this.request(
      'PUT',
      `${this.endpoints.actualizarUsuario}${idCiudadanoActual}/`,
      data
    );
  }

  reasignarCitas(payload: any): Observable<any> {
    return this.request('POST', this.endpoints.reagendarCitas, payload);
  }

  listarCitasLlamando(): Observable<any> {
    return this.request('GET', this.endpoints.listarCitasLlamando);
  }

  listarCitasPrioritariaLlamando(): Observable<any> {
    return this.request('GET', this.endpoints.listarCitasPrioritariasLlamando);
  }

  listarCitasVisor(): Observable<any> {
    return this.request('GET', this.endpoints.listarCitasVisor);
  }

  listarPrioritariasCitasVisor(): Observable<any> {
    return this.request('GET', this.endpoints.listarCitasPrioritariasVisor);
  }

  habilitarCitas(fecha: any): Observable<any> {
    return this.request('POST', this.endpoints.habilitarCitas, fecha);
  }

  habilitarCitasMediaJornada(fecha: any): Observable<any> {
    return this.request(
      'POST',
      this.endpoints.habilitarCitasMediaJornada,
      fecha
    );
  }

  listarTurnosCitasHabilitados(): Observable<any> {
    return this.request('GET', this.endpoints.listarHistoriaTurnos);
  }
}
