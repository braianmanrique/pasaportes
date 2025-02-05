import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportesService } from '../../../services/reportes/reportes.service';

@Component({
  selector: 'app-reporte-formalizador',
  templateUrl: './reporte-formalizador.component.html',
  styleUrl: './reporte-formalizador.component.scss'
})
export class ReporteFormalizadorComponent {
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];
  displayedColumns: string[] = ['nombre', 'cedula', 'fecha', 'prioridad'];
  dataSource = new MatTableDataSource<any>();
  constructor(private reporteService: ReportesService) {}
  onDateChange(event: any) {
    this.fechaSeleccionada = event.value.toISOString().split('T')[0];
    this.loadReportes();
  }

  loadReportes() {
    this.reporteService.getCitasAtendidasDia(this.fechaSeleccionada).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
      },
      error: (err) => console.error('Error cargando reporte:', err),
    });
  }

}
