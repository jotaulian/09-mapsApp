import { Component } from '@angular/core';

interface MenuItem{
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    {name:'Fullscreen',route: '/maps/fullscreen'},
    {name:'Zoom-range',route: '/maps/zoom-range'},
    {name:'Markers',route: '/maps/markers'},
    {name:'Properties',route: '/maps/properties'},
  ]
}
