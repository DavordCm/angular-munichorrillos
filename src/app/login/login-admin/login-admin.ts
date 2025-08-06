import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginAdminService } from './login-admin.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-admin.html',
  styleUrls: ['./login-admin.css']
})
export class LoginAdmin {
  user: string = '';
  password: string = '';
  showPassword: boolean = false;
  isValid: boolean | null = null;
  modalOpen: boolean = false;
  modalContent: string = '';

  constructor(
  private router: Router,
  private loginService: LoginAdminService

  ) {
    if (typeof window !== 'undefined' && localStorage.getItem('auth') === 'true') {
      this.router.navigate(['/menu']);
    }
  }

  async handleLogin(event: Event) {
    event.preventDefault();
    try {
      const userFound = await this.loginService.verificarCredenciales(this.user, this.password);

      if (userFound) {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('username', userFound.usuarioAcceso);
        this.isValid = true;
        setTimeout(() => this.router.navigate(['/menu']), 1000);
      } else {
        this.isValid = false;
      }
    } catch (error) {
      console.error('Error al hacer login:', error);
      this.isValid = false;
    }
  }

  openModal(content: string) {
    this.modalContent = content;
    this.modalOpen = true;
  }

  handleRegister() {
    this.router.navigate(['/register']);
  }

  handleUserLogin() {
    this.router.navigate(['/login_user']);
  }
}
