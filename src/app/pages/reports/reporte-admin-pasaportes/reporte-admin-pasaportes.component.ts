import { Component, Input, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario.service';
import { ReportesService } from '../../../services/reportes/reportes.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-reporte-admin-pasaportes',
  templateUrl: './reporte-admin-pasaportes.component.html',
  styleUrls: ['./reporte-admin-pasaportes.component.scss']
})
export class ReporteAdminPasaportesComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns!: string[];
  @Input() ciudadanos!: any[];
  @Input() generos!: any[];
  @Input() single!: any[];
  @Input() comunidades!: any[];
  @Input() colorScheme!: any;
  @Input() totalCitas: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  minDate: Date = new Date(new Date().getFullYear(), 0, 1); // Enero del año actual
  maxDate: Date = new Date(new Date().getFullYear(), 11, 31); // Diciembre del año actual
  startDate: Date = new Date(); // Comenzar en el mes actual
  exportarExcel() {
    console.log('Exportando datos...');
  }
  
  constructor(
    private loginService: UsuarioService,
    private reportesService: ReportesService,
    private snackBar: MatSnackBar
  ) {}
  onMonthSelected(event: Date, datepicker: any): void {
    const formattedDate = `${event.getFullYear()}-${String(
      event.getMonth() + 1
    ).padStart(2, '0')}`;
    console.log(`Mes seleccionado: ${formattedDate}`);
    datepicker.close(); // Cierra el calendario automáticamente después de seleccionar el mes
    this.loadCiudadanosPorFecha(formattedDate);
  }

  loadCiudadanosPorFecha(fecha: string): void {
    this.reportesService.reporteCiudadanosPasaportesPorFecha(fecha).subscribe({
      next: (data: { ciudadanos: any[] }) => {
        if (data.ciudadanos.length > 0) {
          this.snackBar.open('Consulta realizada con exito.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });

          this.ciudadanos = data.ciudadanos;
          this.dataSource = new MatTableDataSource(this.ciudadanos);

          this.dataSource.paginator = this.paginator; // Vincula el paginador
          console.log('Datos asignados al dataSource:', this.dataSource.data);
          if (this.paginator) {
            this.dataSource.paginator = this.paginator; // Vincula el paginador
            console.log('Paginator asignado correctamente:', this.paginator);
          }
        } else {
          this.snackBar.open('No hay información.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });

          this.dataSource = new MatTableDataSource(['']); // Crea nueva instancia
        }
      },
      error: (err) => {
        console.error(
          'Error al cargar el reporte de ciudadanos por fecha:',
          err
        );
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Si estás filtrando, asegúrate de que la página regrese al inicio
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
