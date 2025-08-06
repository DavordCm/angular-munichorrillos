import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent {
  anchorEl: HTMLElement | null = null;
  anchorElSistema: HTMLElement | null = null;
  anchorElFiscalizacion: HTMLElement | null = null;

  constructor(private router: Router) {}

  openMenu(type: string, event: Event) {
    const target = event.currentTarget as HTMLElement;
    if (type === 'municipalidad') this.anchorEl = target;
    if (type === 'sistema') this.anchorElSistema = target;
    if (type === 'fiscalizacion') this.anchorElFiscalizacion = target;
  }

  closeMenu(type: string) {
    if (type === 'municipalidad') this.anchorEl = null;
    if (type === 'sistema') this.anchorElSistema = null;
    if (type === 'fiscalizacion') this.anchorElFiscalizacion = null;
  }

  handleSalir() {
    localStorage.removeItem('auth');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
