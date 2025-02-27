import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CitasService } from '../../services/citas/citas.service';
import { UsuarioService } from '../../services/usuario.service';
import { Cita } from '../citas/citas.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CitaDialogComponent } from '../../shared/componets/dialog/cita-dialog/cita-dialog.component';

@Component({
  selector: 'app-citas-carnet',
  templateUrl: './citas-carnet.component.html',
  styleUrl: './citas-carnet.component.scss',
})
export class CitasCarnetComponent {
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userRole: string = '';
  displayedColumns: string[] = [
    'turn_desc',
    'atendida',
    'cedula',
    'nombre_citizen',
    'action',
  ];
  constructor(
    private citasService: CitasService,
    private usarioService: UsuarioService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  getAtendidaLabel(value: string): string {
    if (value === 'N') {
      return 'No ingresado';
    } else {
      return 'Ingresado';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


  }

  reloadCitas() {
    this.cargarCitas();
  }
  cargarCitas(): void {
    this.userRole = this.usarioService.getUserRole();
    {
      this.citasService.listarCitasCarnet().subscribe({
        next: (data) => {
          console.log('Respuesta del servicio:', data);
          if (data && Array.isArray(data.citas)) {
            // const citasFiltradas = data.citas.filter(
            //   (cita: Cita) => cita.atendida && cita.atendida !== 'S'
            // );
            this.dataSource = new MatTableDataSource(data.citas);
            this.dataSource.paginator = this.paginator;

          } else {
            console.error('El formato de los datos no es válido:', data);
          }
        },
        error: (err) => {
          console.error('Error al cargar citas:', err);
        },
      });
    }
  }

  openDialog(cita: Cita): void {
    let dialogRef;

      dialogRef = this.dialog.open(CitaDialogComponent, {
        width: '800px',
        data: { cita },
      });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadCitas();
      }
    });
  }

}
