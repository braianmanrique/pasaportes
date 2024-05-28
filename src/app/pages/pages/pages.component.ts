import { Component, Input } from '@angular/core';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;

  @Input() collapsed = false;
  @Input() screenWidthInput = 0;


  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getBodyClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidthInput > 768){
      styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenWidthInput <= 768 && this.screenWidthInput >0 ){
      styleClass = 'body-md-screen';
    }

    return styleClass;

  }

}
