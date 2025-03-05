import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportesService } from '../../../services/reportes/reportes.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-formalizador',
  templateUrl: './reporte-formalizador.component.html',
  styleUrl: './reporte-formalizador.component.scss'
})
export class ReporteFormalizadorComponent {
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];
  displayedColumns: string[] = ['nombre', 'cedula', 'fecha', 'prioridad'];
  selectedDate: string = '';
  selectedReport: string = '';
  reporteGenerado = false;
  fechaError = false;
  isMonthlyReport = false; 
  reportOptions = [
    { name: 'Citas Atendidas en el Día', method: 'getCitasAtendidasDia', type: 'daily' },
    { name: 'Citas Atendidas en el Mes', method: 'getCitasAtendidasMes', type: 'monthly' },

  ];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private reporteService: ReportesService) {}
  onDateChange(event: any) {
    if (event.value) {
      this.fechaSeleccionada = event.value.toISOString().split('T')[0];
    }
  }

  onReportChange() {
    const reporteSeleccionado = this.reportOptions.find(r => r.method === this.selectedReport);
    this.isMonthlyReport = reporteSeleccionado?.type === 'monthly';
    this.fechaSeleccionada = ''; 
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
    
    const reporteSeleccionado = this.reportOptions.find(r => r.method === this.selectedReport);
  
    if (reporteSeleccionado) {
      (this.reporteService as any)[this.selectedReport](this.fechaSeleccionada)
        .subscribe({
          next: (data: any) => {
  
            if (data && data.ciudadanos && Array.isArray(data.ciudadanos)) {
              this.dataSource.data = data.ciudadanos;
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

  exportarExcel(){
    const columnasFiltradas = this.dataSource.data.map(({fec_atencion	, formalizador, ...restoInfo})=> restoInfo);
    const resumen = this.calcularResumenPorTipoDocumento(columnasFiltradas);

    const hojaDeTrabajo = XLSX.utils.json_to_sheet(columnasFiltradas);
    const hojaResumen = XLSX.utils.json_to_sheet(resumen);


    
    // const hojaDeTrabajo = XLSX.utils.json_to_sheet(this.dataSource.data);
    const libroDeTrabajo: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(libroDeTrabajo, hojaDeTrabajo, 'Reporte');
    XLSX.utils.book_append_sheet(libroDeTrabajo, hojaDeTrabajo, 'Reporte');
    XLSX.utils.book_append_sheet(libroDeTrabajo, hojaResumen, 'Resumen');

    const fechaActual = new Date().toISOString().split('T')[0];
    XLSX.writeFile(libroDeTrabajo, `Reporte_Ciudadanos_${fechaActual}.xlsx`);

    
  }
  
  calcularResumenPorTipoDocumento(datos: any[]) {
    const conteo: { [key: string]: number } = {};
  
    datos.forEach(({ tipo_documento }) => {
      if (!conteo[tipo_documento]) {
        conteo[tipo_documento] = 0;
      }
      conteo[tipo_documento]++;
    });
  
    return Object.entries(conteo).map(([tipo_documento, cantidad]) => ({
      tipo_documento,
      cantidad,
    }));
  }
  

  

}
