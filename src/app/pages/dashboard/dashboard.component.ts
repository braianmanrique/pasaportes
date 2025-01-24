import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../interfaces/user.interface';
import { LoadingService } from '../../services/shared/loading.service';

export interface Funcionario {
  id: number;  // Asegúrate de usar `number` para ID
  nombre: string;
  caja: string;  // Caja o puesto en el que está trabajando
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // funcionarios: Funcionario[] = FUNCIONARIOS_MOCK;  // Datos mock de funcionarios
  userLoginOn:boolean = false;
  userData?:User ;
  selectedFuncionario: Funcionario | null = null;
  userName: string = '';
  userRole: string = '';
  userUsername: string = '';
  funcionarios = [
    { id: 1, nombre: 'Juan Pérez', caja: 'Caja 1' },
    { id: 2, nombre: 'Ana Gómez', caja: 'Caja 2' },
    { id: 3, nombre: 'Carlos López', caja: 'Caja 3' },
    // Agrega más funcionarios según necesidad
  ];
  constructor(private loginService: UsuarioService,  private loadingService: LoadingService) {
    
  }
  onFuncionarioSelect(event: any): void {
    const selectedId = event.value;
    this.selectedFuncionario = this.funcionarios.find(f => f.id === selectedId) || null;
  }

  ngOnDestroy():void{
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.subscribe();
  }
  
  ngOnInit(): void{

    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = `${userData.username}` ;
    this.userRole = userData.rol || 'Sin rol definido';
    this.userUsername = userData.username || 'Sin usuario';
    this.loadingService.hide(); 


    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn = userLoginOn;

      }
    });

    this.loginService.currentUserData.subscribe({
      next:(userData) => {
        console.log(userData,'userLoginOn')

        this.userData = userData;
      }
    })


  }

}
