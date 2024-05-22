import { Component, ElementRef, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChild('menuToggle') menuToggle?: ElementRef;
  @ViewChild('navigation') navigation?: ElementRef;

  toggleMenu() {
    this.navigation!.nativeElement.classList.toggle('active');
  }
  userLoginOn:boolean = false;
  constructor(private loginService: UsuarioService) {
    
  }

  menuItems = [
    { name: 'Home', route: '/dashboard' },
    { name: 'Profile', route: '/profile' },
    { name: 'Settings', route: '/settings' },
    // Agrega más elementos de menú según sea necesario
  ];

  selectedItem: any = null;

  selectItem(item: any) {
    this.selectedItem = item;
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
    })
  }

}
