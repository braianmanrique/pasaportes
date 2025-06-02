import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmaModuloDialogComponentTsComponent } from '../../shared/componets/dialog/confirma-modulo-dialog.component.ts/confirma-modulo-dialog.component.ts.component';
import { CitasService } from '../../services/citas/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaDialogComponent } from '../../shared/componets/dialog/cita-dialog/cita-dialog.component';
import { VisorWebsocketService } from '../../services/visor-websocket/visor-websocket.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CitasLlamadasDialogComponent } from '../../shared/componets/dialog/citas-llamadas-dialog/citas-llamadas-dialog.component';

export interface Cita {
  id_turn: string;
  turn_desc: string;
  fec_registro: string;
  hora: string;
  id_cita: string;
  puesto: string;
  atendida: string;
  nombre_citizen: string;
}

@Component({
  selector: 'app-seleccionar-modulo',
  templateUrl: './seleccionar-modulo.component.html',
  styleUrl: './seleccionar-modulo.component.scss',
})
export class SeleccionarModuloComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private citasService: CitasService,
    private snackBar: MatSnackBar,
    private wsService: VisorWebsocketService,
    private cdr: ChangeDetectorRef
  ) {}
  oficinaSeleccionada: any = null;
  mpleadoCitaActual: any = null;
  atendiendoCitaId: number | null = null; 
  atendiendoCita: any | null = null;
  @ViewChild('paginatorCitas', { static: false }) paginatorCitas!: MatPaginator;
  @ViewChild('paginatorCitasPrioritarias', { static: false })
  paginatorCitasPrioritarias!: MatPaginator;

  citasDataSource = new MatTableDataSource<any>([]);
  citasPrioritariasDataSource = new MatTableDataSource<any>([]);

  isPrioritaria: boolean = false;
  citasLlamadas: any[] = [];
  citasPrioritariasLlamadas: any[] = [];

  oficinas = [
    { id: 1, nombre: 'Módulo 1', estado: 'libre' },
    { id: 2, nombre: 'Módulo 2', estado: 'ocupado' },
    { id: 3, nombre: 'Módulo 3', estado: 'ocupado' },
    { id: 4, nombre: 'Módulo 4', estado: 'ocupado' },
    { id: 5, nombre: 'Módulo 5', estado: 'ocupado' },
    { id: 6, nombre: 'Módulo 6', estado: 'ocupado' },
    { id: 7, nombre: 'Módulo 7', estado: 'ocupado' },
    { id: 8, nombre: 'Módulo 8', estado: 'ocupado' },
    { id: 9, nombre: 'Módulo 9', estado: 'ocupado' },
    { id: 10, nombre: 'Módulo 10', estado: 'ocupado' },
  ];
  citasPrioritarias: any[] = [];
  citas: any;
  displayedColumns: string[] = [
    'nombre_citizen',
    'fec_registro',
    'atendida',
    'action',
  ];

  ngOnInit() {
    const storedPrioritaria = localStorage.getItem('isPrioritaria');
    this.isPrioritaria = storedPrioritaria
      ? JSON.parse(storedPrioritaria)
      : true;

    const storedModulo = localStorage.getItem('moduloSeleccionado');
    if (storedModulo) {
      this.oficinaSeleccionada = JSON.parse(storedModulo);
      this.cargarCitas();
      this.cargarPrioritarias();

      this.verificarCitasEnLlamada();
    }

    this.wsService.connect(
      'wss://backend-auth-log-project.onrender.com/ws/citas/'
    );

    this.wsService.getMessages().subscribe((data: any) => {
      if (window.location.pathname !== '/dashboard/citas-modulo') return;
      if (data.id_cita && data.nuevo_estado) {
        console.log('🔄 Actualizando citas vía WebSocket:', data);
        this.actualizarEstadoCita(data.id_cita, data.nuevo_estado, data);
      }
    });
  }

  verificarCitasEnLlamada() {
    this.citasService.listarCitasLlamando().subscribe({
      next: (response: any) => {
        if (response.citas.length > 0) {
          this.isPrioritaria = false;
          this.openCitasLlamadasDialog(response.citas, false);
        } else {
          this.citasService.listarCitasPrioritariaLlamando().subscribe({
            next: (resp: any) => {
              if (resp.citas.length > 0) {
                this.isPrioritaria = true;
                this.openCitasLlamadasDialog(resp.citas, true);
              }
            },
          });
        }
      },
    });
  }

  cargarCitas(): void {
    if (!this.oficinaSeleccionada) {
      this.snackBar.open('Por favor selecciona un módulo primero.', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    this.citasService.listarCitasPorCaja().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.citas)) {
          const citasFiltradas = data.citas.filter(
            (cita: any) => cita.atendida && cita.atendida !== 'S'
          );

          const citasUnicas: any[] = [];
          const nucleosRegistrados = new Set();

          citasFiltradas.forEach((cita: any) => {
            if (cita.tipo_cita === 'Familiar') {
              if (!nucleosRegistrados.has(cita.nucleo_familiar)) {
                citasUnicas.push(cita);
                nucleosRegistrados.add(cita.nucleo_familiar);
              }
            } else {
              citasUnicas.push(cita);
            }
          });

          this.citas = citasUnicas;
        } else {
          this.citas = [];
        }
      },
      error: (err) => {
        console.error('Error al cargar citas por módulo:', err);
        this.snackBar.open('Error al cargar citas para el módulo.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.citasDataSource.paginator = this.paginatorCitas;
      this.citasPrioritariasDataSource.paginator = this.paginatorCitasPrioritarias;
    });
  }

  actualizarEstadoCita(idCita: number, nuevoEstado: string, citaData: any) {
    const index = this.citas.findIndex(
      (cita: any) => Number(cita.id_cita) === Number(idCita)
    );

    if (index !== -1) {
      let cita = { ...this.citas[index], atendida: nuevoEstado };

      if (nuevoEstado === 'L' || nuevoEstado === 'D') {
        this.citas.splice(index, 1);
      } else {
        this.citas[index] = cita;
      }

      this.citas = [...this.citas];
      this.cdr.detectChanges();
    } else {
      if (nuevoEstado === 'N' || nuevoEstado === 'E') {
        this.citasLlamadas.splice(index, 1);
        this.citas.push(citaData);
        this.citas = [...this.citas];
      }
    }
  }

  actualizarCitasMostradas() {
    this.citasLlamadas = [
      ...this.citasLlamadas,
      ...this.citasPrioritariasLlamadas,
    ];

    if (this.citasLlamadas.length > 0) {
      this.atendiendoCita = this.citasLlamadas[0];
    }

    this.cdr.detectChanges();
  }
  trackByCita(index: number, cita: any): number {
    return cita.id_cita;
  }
  openConfirmDialog(oficina: any) {
    const dialogRef = this.dialog.open(
      ConfirmaModuloDialogComponentTsComponent,
      { data: oficina }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.citasService.seleccionarCaja(oficina.id).subscribe({
          next: () => {
            this.oficinaSeleccionada = oficina;
            localStorage.setItem('moduloSeleccionado', JSON.stringify(oficina));
            this.cargarCitas();
            this.cargarPrioritarias();
          },
          error: (err) => {
            console.error('Error al seleccionar la caja', err);
            this.snackBar.open(err.error.error, 'Cerrar', { duration: 3000 });
          },
        });
      }
    });
  }

  liberarModulo() {
    this.citasService.liberarCaja().subscribe({
      next: (response) => {
        this.oficinaSeleccionada = null;
        localStorage.removeItem('moduloSeleccionado');
        this.snackBar.open(`${response.mensaje}`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.oficinaSeleccionada = null;
        this.snackBar.open(`${error.error.error}`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  getAtendidaLabel(value: string): string {
    if (value === 'N') {
      return 'No atendida';
    } else if (value === 'S') {
      return 'Atendida';
    } else if (value === 'L') {
      return 'Llamando';
    } else if (value === 'D') {
      return 'Atendiendo';
    } else if (value === 'C') {
      return 'Cancelada';
    } else if (value === 'E') {
      return 'En espera';
    }
    return 'Desconocido';
  }


  llamarCita(cita: any, esPrioritaria: boolean = false): void {
    this.isPrioritaria = esPrioritaria;
    localStorage.setItem('isPrioritaria', JSON.stringify(esPrioritaria));

    const actualizarEstado = esPrioritaria
      ? this.citasService.actualizarEstadoCitaPrioritaria(cita.id_cita, 'L')
      : this.citasService.actualizarEstadoCita(cita.id_cita, 'L');

    actualizarEstado.subscribe({
      next: () => {
        this.snackBar.open(`Llamando a ${cita.nombre_citizen} .`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.verificarCitasEnLlamada();
      },
      error: (err) => {
        this.snackBar.open(err.error.error, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  openCitasLlamadasDialog(citas: any[], esPrioritaria: boolean): void {
    const dialogRef = this.dialog.open(CitasLlamadasDialogComponent, {
      width: '70%',
      height: '70%',
      data: {
        citasLlamadas: citas,
        isPrioritaria: esPrioritaria,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.verificarCitasEnLlamada();
        this.reloadCitas();
      }
    });
  }

  openDialog(cita: Cita): void {
    const dialogRef = this.dialog.open(CitaDialogComponent, {
      width: '600px',
      data: { cita },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadCitas();
      }
    });
  }

  cargarPrioritarias(): void {
    if (!this.oficinaSeleccionada) {
      this.snackBar.open('Por favor selecciona un módulo primero.', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    this.citasService.listarCitasPrioritariasFuncionario().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.citas)) {
          const citasFiltradas = data.citas.filter(
            (cita: Cita) => cita.atendida && cita.atendida !== 'S'
          );

          this.citasPrioritarias = citasFiltradas;
        } else {
          this.citas = [];
        }
      },
      error: (err) => {
        console.error('Error al cargar citas por módulo:', err);
        this.snackBar.open('Error al cargar citas para el módulo.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  reloadCitas(): void {
    this.cargarCitas();
    this.cargarPrioritarias();
  }

  isCallDisabled(): boolean {
    return this.citasLlamadas.length > 0;
  }
}
