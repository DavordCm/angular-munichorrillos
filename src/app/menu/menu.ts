import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent {
  dropdownOpen: string | null = null;
  mobileMenuOpen = false;
  username = '';

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      this.username = localStorage.getItem('username') || 'Administrador';
    }
  }

  toggleDropdown(menu: string) {
    this.dropdownOpen = this.dropdownOpen === menu ? null : menu;
  }

  closeDropdowns() {
    this.dropdownOpen = null;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  handleSalir() {
    localStorage.removeItem('auth');
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
