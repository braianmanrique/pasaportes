import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userLoginOn:boolean = false;
  userData?:User ;

  constructor(private loginService: UsuarioService) {
    
  }

  ngOnDestroy():void{
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.subscribe();
  }
  
  ngOnInit(): void{
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn = userLoginOn;

      }
    });

    this.loginService.currentUserData.subscribe({
      next:(userData) => {
        this.userData = userData;
      }
    })


  }

}
