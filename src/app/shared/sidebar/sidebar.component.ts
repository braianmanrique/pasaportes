import { Component, ElementRef, EventEmitter, HostListener, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { navbarData } from './nav-data';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChild('menuToggle') menuToggle?: ElementRef;
  @ViewChild('navigation') navigation?: ElementRef;
  @ViewChildren('listItems', { read: ElementRef }) listItems?: QueryList<ElementRef>;

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  screenWidth = 0;
  collapsed = false;
  navData = navbarData;

  toggleMenu() {
    this.navigation!.nativeElement.classList.toggle('active');
  }
  userLoginOn:boolean = false;
  
  constructor(private loginService: UsuarioService) {
    
  }

  activeLink(){

    this.listItems?.forEach((item) =>{
      item.nativeElement.classList.remove('active')
      // this.nativeElement.classList.
    })
    
  }

  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})

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
    this.screenWidth = window.innerWidth;

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn = userLoginOn;
      }
    })
  }

}
