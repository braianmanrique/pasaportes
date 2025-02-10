import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private baseUrl =
    'https://backend-auth-log-project.onrender.com/api/usuarios';
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Token ${token}` });
  }

  reporteTotalPasaportes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_total_pasaportes/`, {
      headers: this.getHeaders(),
    });
  }

  reporteGeneroPasaportes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_genero_pasaportes/`, {
      headers: this.getHeaders(),
    });
  }
  reporteCualidadesPasaportes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_cualidades_pasaportes/`, {
      headers: this.getHeaders(),
    });
  }
  reporteComunidadPasaportes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_comunidad_pasaportes/`, {
      headers: this.getHeaders(),
    });
  }

  reporteTotalCarnet(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_total_carnet/`, {
      headers: this.getHeaders(),
    });
  }

  reporteGeneroCarnet(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_genero_carnet/`, {
      headers: this.getHeaders(),
    });
  }

  reporteCualidadesCarnet(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_cualidades_carnet/`, {
      headers: this.getHeaders(),
    });
  }
  reporteComunidadCarnet(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_comunidad_carnet/`, {
      headers: this.getHeaders(),
    });
  }

  reporteTotalSalud(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_total_salud/`, {
      headers: this.getHeaders(),
    });
  }

  reporteTotalJuntas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_total_juntas/`, {
      headers: this.getHeaders(),
    });
  }

  reporteGeneroSalud(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_genero_salud/`, {
      headers: this.getHeaders(),
    });
  }

  reporteCualidadesSalud(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_cualidades_salud/`, {
      headers: this.getHeaders(),
    });
  }

  reporteComunidadSalud(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_comunidad_salud/`, {
      headers: this.getHeaders(),
    });
  }

  reporteGeneroJuntas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_genero_juntas/`, {
      headers: this.getHeaders(),
    });
  }

  reporteCualidadesJuntas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_cualidades_juntas/`, {
      headers: this.getHeaders(),
    });
  }

  reporteComunidadJuntas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte_comunidad_juntas/`, {
      headers: this.getHeaders(),
    });
  }

  reporteCiudadanosPasaportesPorFecha(fecha: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/reporte_info_users_bot_pasaportes/?fecha=${fecha}`,
      { headers: this.getHeaders() }
    );
  }

  getReporteInfoGeneral(fecha: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/reporte_info_user_bot_general/?fecha=${fecha}`,
      { headers: this.getHeaders() }
    );
  }

  getCitasPrioritariasDia(fecha: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/reporte_citas_prioritarias_atendidas_formalizador_dia_pasaportes/?fecha=${fecha}`,
      { headers: this.getHeaders() }
    );
  }

  getCitasAtendidasDia(fecha: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/reporte_citas_atendidas_formalizador_dia_pasaportes/?fecha=${fecha}`,
      { headers: this.getHeaders() }
    );
  }

  getCitasPrioritariasMes(fecha: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/reporte_citas_prioritarias_atendidas_formalizador_mes_pasaportes/?fecha=${fecha}`,
      { headers: this.getHeaders() }
    );
  }

  getCitasAtendidasMes(fecha: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/reporte_citas_atendidas_formalizador_mes_pasaportes/?fecha=${fecha}`,
      { headers: this.getHeaders() }
    );
  }
}
