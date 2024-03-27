import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string;
  url: string;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  menuItems: MenuItem[] = [
    { name: 'Full Screen', url: '/maps/fullscreen' },
    { name: 'Zoom Range', url: '/maps/zoom-range' },
    { name: 'Markers', url: '/maps/markers' },
    { name: 'Houses', url: '/maps/properties' },
    { name: 'Alone Page', url: '/alone' },
  ];
}
