import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ReportesService } from '../../services/reportes/reportes.service';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements AfterViewInit {
  constructor(
    private loginService: UsuarioService,
    private reportesService: ReportesService,
    private snackBar: MatSnackBar
  ) {}

  totalCitas: number | null = null;
  cualidadesData: any;
  comunidades: any;
  generos: any;
  single: any;

  selectedMes: number = new Date().getMonth() + 1;
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  selectedFecha: Date | null = null;
  userRole = 'administrador_pasaportes'; // Cambiar según tu lógica de usuario
  ciudadanosPorMes: any[] = [];

  minDate: Date = new Date(new Date().getFullYear(), 0, 1); // Enero del año actual
  maxDate: Date = new Date(new Date().getFullYear(), 11, 31); // Diciembre del año actual
  startDate: Date = new Date(); // Comenzar en el mes actual
  defaultDate: Date = new Date();
  selectedAnio: number | null = null;

  displayedColumns: string[] = [
    'nombre',
    'cedula',
    'fecha_registro',
    'genero',
    'comunidad',
    'mail',
    'celular',
  ];
  ciudadanos: any[] = [];

  displayedColumnsSistem: string[] = [
    'servicio',
    'nombre',
    'cedula',
    'celular',
    'mail',
    'genero',
    'comunidad',
    'fecha_registro',
  ];
  dataSource = new MatTableDataSource<any>();

  dataSourceGeneral = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) set paginatorSetter(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator; // Vincula el paginator
    }
  }

  ngAfterViewInit(): void {
    console.log('Paginator vinculado en AfterViewInit:', this.paginator);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();

    if (
      this.userRole === 'administrador_discapacidad' ||
      this.userRole === 'administrador_sistema'
    ) {
      this.showDataSalud();
    } else if (
      this.userRole === 'administrador_juntas' ||
      this.userRole === 'administrador_sistema'
    ) {
      this.showDataJuntas();
    } else if (
      this.userRole === 'administrador_pasaportes' ||
      this.userRole === 'administrador_sistema'
    ) {
      this.showDataPasaportes();
    } else if (
      this.userRole === 'administrador_ganadero' ||
      this.userRole === 'administrador_sistema'
    ) {
      this.showDataCarnet();
    }
  }

  onTabChange(event: any): void {
    const selectedIndex = event.index;
    this.resetFields();
    switch (selectedIndex) {
      case 0:
        if (
          this.userRole === 'administrador_ganadero' ||
          this.userRole === 'administrador_sistema'
        ) {
          this.showDataCarnet();
        }
        break;
      case 1:
        if (
          this.userRole === 'administrador_pasaportes' ||
          this.userRole === 'administrador_sistema'
        ) {
          this.showDataPasaportes();
        }
        break;
      case 2:
        if (
          this.userRole === 'administrador_juntas' ||
          this.userRole === 'administrador_sistema'
        ) {
          this.showDataJuntas();
        }
        break;
      case 3:
        if (
          this.userRole === 'administrador_discapacidad' ||
          this.userRole === 'administrador_sistema'
        ) {
          this.showDataSalud();
        }
        break;
      default:
        console.warn('Tab no mapeado para el índice:', selectedIndex);
    }
  }

  resetFields(): void {
    this.totalCitas = null;
    this.generos = null;
    this.comunidades = null;
    this.single = null;
  }

  showDataCarnet() {
    this.reportesService.reporteTotalCarnet().subscribe({
      next: (data) => {
        this.totalCitas = data.total_citas;
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteGeneroCarnet().subscribe({
      next: (data: any[]) => {
        this.generos = data.map((item) => ({
          name: item.genero,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteComunidadCarnet().subscribe({
      next: (data: any[]) => {
        this.comunidades = data.map((item) => ({
          name: item.comunidad,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteCualidadesCarnet().subscribe({
      next: (data: any[]) => {
        this.single = data.map((item) => ({
          name: item.cualidad,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });
  }

  showDataPasaportes() {
    this.reportesService.reporteTotalPasaportes().subscribe({
      next: (data) => {
        this.totalCitas = data.total_citas;
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteGeneroPasaportes().subscribe({
      next: (data: any[]) => {
        this.generos = data.map((item) => ({
          name: item.genero,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteComunidadPasaportes().subscribe({
      next: (data: any[]) => {
        this.comunidades = data.map((item) => ({
          name: item.comunidad,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteCualidadesPasaportes().subscribe({
      next: (data: any[]) => {
        this.single = data.map((item) => ({
          name: item.cualidad,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });
  }
  showDataJuntas() {
    this.reportesService.reporteTotalJuntas().subscribe({
      next: (data) => {
        this.totalCitas = data.total_citas;
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteGeneroJuntas().subscribe({
      next: (data: any[]) => {
        this.generos = data.map((item) => ({
          name: item.genero,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteComunidadJuntas().subscribe({
      next: (data: any[]) => {
        this.comunidades = data.map((item) => ({
          name: item.comunidad,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteCualidadesJuntas().subscribe({
      next: (data: any[]) => {
        this.single = data.map((item) => ({
          name: item.cualidad,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });
  }

  showDataSalud() {
    this.reportesService.reporteCualidadesSalud().subscribe({
      next: (data: any[]) => {
        this.single = data.map((item) => ({
          name: item.cualidad,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteTotalSalud().subscribe({
      next: (data) => {
        console.log('Reporte total salud (discapacidad):', data);
        this.totalCitas = data.total_citas;
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteComunidadSalud().subscribe({
      next: (data: any[]) => {
        this.comunidades = data.map((item) => ({
          name: item.comunidad,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });

    this.reportesService.reporteGeneroSalud().subscribe({
      next: (data: any[]) => {
        this.generos = data.map((item) => ({
          name: item.genero,
          value: item.cantidad,
        }));
      },
      error: (err) => console.error(err),
    });
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

  loadCiudadanosPorFechaGeneral(fecha: string): void {
    this.reportesService.getReporteInfoGeneral(fecha).subscribe({
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

  exportarExcel(): void {
    const hojaDeTrabajo = XLSX.utils.json_to_sheet(this.ciudadanos);
    const libroDeTrabajo: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libroDeTrabajo, hojaDeTrabajo, 'Reporte');

    const fechaActual = new Date().toISOString().split('T')[0];
    XLSX.writeFile(libroDeTrabajo, `Reporte_Ciudadanos_${fechaActual}.xlsx`);
  }

  

  onMonthSelected(event: Date, datepicker: any): void {
    const formattedDate = `${event.getFullYear()}-${String(
      event.getMonth() + 1
    ).padStart(2, '0')}`;
    console.log(`Mes seleccionado: ${formattedDate}`);
    datepicker.close(); // Cierra el calendario automáticamente después de seleccionar el mes
    this.loadCiudadanosPorFecha(formattedDate);
  }

  onMonthSelectedGeneral(event: Date, datepicker: any): void {
    const formattedDate = `${event.getFullYear()}-${String(
      event.getMonth() + 1
    ).padStart(2, '0')}`;
    datepicker.close(); 
    this.loadCiudadanosPorFechaGeneral(formattedDate);
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Si estás filtrando, asegúrate de que la página regrese al inicio
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadReporteInfoGeneral(fecha: string): void {
    this.reportesService.getReporteInfoGeneral(fecha).subscribe({
      next: (data: any[]) => {
        if (data.length > 0) {
          this.snackBar.open('Reporte cargado con éxito.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
  
          // Asigna los datos al MatTableDataSource
          this.dataSourceGeneral = new MatTableDataSource(data);
  
          // Vincula el paginador si existe
          if (this.paginator) {
            this.dataSourceGeneral.paginator = this.paginator;
          }
        } else {
          this.snackBar.open('No hay datos disponibles.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.dataSourceGeneral = new MatTableDataSource<any>([]);

        }
      },
      error: (err) => {
        console.error('Error al cargar el reporte general:', err);
        this.snackBar.open('Error al cargar los datos.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  } 

  onDateChange(event: any): void {
    const fechaSeleccionada = event.value.toISOString().split('T')[0]; // Convierte la fecha seleccionada
    this.loadReporteInfoGeneral(fechaSeleccionada); // Llama al método con la fecha seleccionada
  }

  onDateChangeGeneral(event: any): void {
    const fechaSeleccionada = event.value.toISOString().split('T')[0]; // Convierte la fecha seleccionada
    this.loadReporteInfoGeneral(fechaSeleccionada); // Llama al método con la fecha seleccionada
  }
}
