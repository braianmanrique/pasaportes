import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../interfaces/user.interface';
import { LoadingService } from '../../services/shared/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from '../../services/reportes/reportes.service';
import moment from 'moment';
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

  constructor(
    private loginService: UsuarioService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private reportesService: ReportesService
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
