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
  // dataSource: any[] = [];
  selectedDate: string = '';
  selectedReport: string = '';
  reporteGenerado = false;
  fechaError = false;
  isMonthlyReport = false; 
  reportOptions = [
    { name: 'Citas Prioritarias Atendidas en el Día', method: 'getCitasPrioritariasDia', type: 'daily' },
    { name: 'Citas Atendidas en el Día', method: 'getCitasAtendidasDia', type: 'daily' },
    { name: 'Citas Prioritarias Atendidas en el Mes', method: 'getCitasPrioritariasMes', type: 'monthly' },
    { name: 'Citas Atendidas en el Mes', method: 'getCitasAtendidasMes', type: 'monthly' },
    { name: 'Citas Atendidas en el Mes', method: 'getCitasAtendidasMes', type: 'monthly' }

  ];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private reporteService: ReportesService) {}
  onDateChange(event: any) {
    if (event.value) {
      this.fechaSeleccionada = event.value.toISOString().split('T')[0]; // YYYY-MM-DD
      console.log('Fecha seleccionada:', this.fechaSeleccionada);
    }
  }

  onReportChange() {
    const reporteSeleccionado = this.reportOptions.find(r => r.method === this.selectedReport);
    this.isMonthlyReport = reporteSeleccionado?.type === 'monthly';
    this.fechaSeleccionada = '';  // Reiniciar la fecha cuando se cambia el reporte
  }

  chosenYearHandler(normalizedYear: Date) {
    const year = normalizedYear.getFullYear();
    this.fechaSeleccionada = `${year}-01`;  // Se establece enero como default hasta que se elija mes
  }

  chosenMonthHandler(normalizedMonth: Date, datepicker: any) {
    const month = (normalizedMonth.getMonth() + 1).toString().padStart(2, '0');
    const year = normalizedMonth.getFullYear();
    this.fechaSeleccionada = `${year}-${month}`;
    datepicker.close(); // Cierra el selector de fecha
  }

  generarReporte(): void {
    if (!this.selectedReport) {
      alert('Selecciona un reporte');
      return;
    }
  
    if (!this.fechaSeleccionada) {
      alert('Selecciona una fecha para generar el reporte');
      return;
    }
  
    console.log(`Generando reporte: ${this.selectedReport} con fecha ${this.fechaSeleccionada}`);
  
    const reporteSeleccionado = this.reportOptions.find(r => r.method === this.selectedReport);
  
    if (reporteSeleccionado) {
      (this.reporteService as any)[this.selectedReport](this.fechaSeleccionada)
        .subscribe({
          next: (data: any) => {
            console.log('Datos del reporte recibidos:', data);
            debugger
  
            if (data && data.ciudadanos && Array.isArray(data.ciudadanos)) {
              this.dataSource.data = data.ciudadanos; // Asigna los datos correctamente
            } else {
              this.dataSource.data = [];
              console.warn('El reporte no tiene datos disponibles.');
            }
            
            this.reporteGenerado = true;
          },
          error: (err: any) => {
            console.error('Error al obtener el reporte:', err);
            this.dataSource.data = [];
            this.reporteGenerado = true;
          }
        });
    }
  }
  
  
  // loadReportes() {
  //   this.reporteService.getCitasAtendidasDia(this.fechaSeleccionada).subscribe({
  //     next: (data) => {
  //       this.dataSource = new MatTableDataSource(data);
  //     },
  //     error: (err) => console.error('Error cargando reporte:', err),
  //   });
  // }

}
