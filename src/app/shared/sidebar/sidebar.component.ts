import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @ViewChild('menuToggle') menuToggle?: ElementRef;
  @ViewChild('navigation') navigation?: ElementRef;
  @ViewChildren('listItems', { read: ElementRef })
  listItems?: QueryList<ElementRef>;
  title: string = '';
  sigla: string = '';
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }
  screenWidth = 0;
  collapsed = false;
  navData = navbarData;
  userRole: string = '';

  userLoginOn: boolean = false;
  selectedItem: any = null;
  constructor(private loginService: UsuarioService) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;

        this.userRole = this.loginService.getUserRole(); // Aquí deberías obtener el rol del servicio de usuario

        if (this.userRole === 'administrador_pasaportes') {
          this.title = 'Admi pasaportes';
          this.sigla = 'P';
        } else if (this.userRole === 'atencion_pasaporte') {
          this.title = 'Funcionario';
          this.sigla = 'F';
        } else if (this.userRole === 'asignador') {
          this.title = 'Asignador';
          this.sigla = 'A';
        } else if (this.userRole === 'administrador_juntas') {
          this.title = 'Admi Juntas';
          this.sigla = 'J';
        }else if( this.userRole === 'administrador_discapacidad'){
          this.title = 'Salud'
          this.sigla = 'S'
        }
        else if( this.userRole === 'atencion_ganadero'){
          this.title = 'Carnet Ganadero'
          this.sigla = 'C'
        } else if( this.userRole === 'administrador_ganadero'){
          this.title = 'Admin Carnet Ganadero'
          this.sigla = 'C'
        }else if(this.userRole === 'administrador_sistema'){
          this.title = 'Administrador'
          this.sigla = 'A'
        }
         else {
          this.title = 'Panel de Usuario';
        }
        this.filterMenuItems(); // Filtramos las opciones del menú según el rol
      },
    });
  }

  activeLink() {
    this.listItems?.forEach((item) => {
      item.nativeElement.classList.remove('active');
    });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.updateBodyClass();
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.updateBodyClass();
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  private updateBodyClass(): void {
    if (this.collapsed) {
      document.body.classList.add('sidenav-collapsed');
    } else {
      document.body.classList.remove('sidenav-collapsed');
    }
  }
  toggleMenu() {
    this.navigation!.nativeElement.classList.toggle('active');
  }
  selectItem(item: any) {
    this.selectedItem = item;
  }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.subscribe();
  }

  filterMenuItems() {
    this.navData = navbarData.filter((item) =>
      item.roles.includes(this.userRole)
    );
  }

  get userRoleClass(): string {
    switch (this.userRole) {
      case 'administrador_pasaportes':
        return 'role-admin-pasaportes';
      case 'atencion_pasaporte':
        return 'role-funcionario';
      case 'asignador':
        return 'role-asignador';
      case 'administrador_juntas':
        return 'role-admin-juntas';
      case 'administrador_discapacidad':
        return 'role-admin-salud';
      case 'atencion_ganadero':
      case 'administrador_ganadero':
        return 'role_atencion_ganadero'
      case 'administrador_sistema':
        return 'role-admin';
      default:
        return 'role-usuario';
    }
  }
}
