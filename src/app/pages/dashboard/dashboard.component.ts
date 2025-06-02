import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../interfaces/user.interface';
import { LoadingService } from '../../services/shared/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from '../../services/reportes/reportes.service';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface Funcionario {
  id: number;
  nombre: string;
  caja: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  userLoginOn: boolean = false;
  userData?: User;
  selectedFuncionario: Funcionario | null = null;
  userName: string = '';
  firstName: string = '';
  userRole: string = '';
  userUsername: string = '';

  reporteForm: FormGroup;

  reporteCitas: any = null;
  buscarCedulaForm = this.fb.group({
    cedula: ['', [Validators.required, Validators.minLength(5)]],
  });
  resultadoBusqueda: any[] = [];
  yaBusco = false;
  resultadoCedula: any = null;
  constructor(
    private loginService: UsuarioService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private snackBar: MatSnackBar
  ) {
    this.reporteForm = this.fb.group({
      fecha: [moment().toDate(), Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.subscribe();
  }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.firstName = `${userData.first_name}` || '...';
    this.userRole = userData.rol || 'Sin rol definido';
    this.userUsername = userData.username || 'Sin usuario';
    this.loadingService.hide();

    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        console.log(userData, 'userLoginOn');

        this.userData = userData;
      },
    });
  }
  limpiarBusquedaCedula() {
    this.buscarCedulaForm.reset();        
    this.resultadoBusqueda = [];            
    this.yaBusco = false;                   

  }

  get cedula() {
    return this.buscarCedulaForm.get('cedula')!;
  }
  
  buscarPorCedula() {
    debugger
    const cedula = this.buscarCedulaForm.get('cedula')?.value;
    if (!cedula) return;
  
    if (!cedula || this.buscarCedulaForm.invalid ) {
      // Aquí evitas ejecutar la búsqueda si la cédula no es válida
      return;
    }
  
    const url = `https://backend-auth-log-project.onrender.com/api/usuarios/reporte_citas_pasaportes_estados_completo/?cedula=${cedula}`;
    this.reportesService.getInfoPorCedula(url).subscribe({
      next: (data) => {
        if (data) {
          const citasAsignadas = data.citas_asignadas || [];
          const citasPrioritarias = data.citas_prioritarias || [];
          this.resultadoBusqueda = [...citasAsignadas, ...citasPrioritarias];
  
          this.yaBusco = true;
  
          if (this.resultadoBusqueda.length > 0) {
            this.snackBar.open('Persona encontrada con éxito.', 'Cerrar', {
              duration: 3000,
            });
          } else {
            this.snackBar.open('No se encontraron citas para esta cédula.', 'Cerrar', {
              duration: 3000,
            });
          }
        }
      },
      error: (err) => {
        console.error('Error al buscar por cédula:', err);
        this.resultadoBusqueda = [];
        this.yaBusco = true;
        this.snackBar.open('Ocurrió un error al consultar.', 'Cerrar', { duration: 3000 });
      },
    });
  }
  

  consultarCitas(): void {
    const fechaSeleccionada = moment(this.reporteForm.value.fecha).format(
      'DD/MM/YYYY'
    );

    this.reportesService.getReporteCitasDia(fechaSeleccionada).subscribe({
      next: (response: any) => {
        this.reporteCitas = response;
      },
      error: (error) => {
        console.log(error, 'err');
      },
    });
  }
}
