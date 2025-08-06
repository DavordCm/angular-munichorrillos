import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginUsuarioService } from './login-usuario.service';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-usuario.html',
  styleUrls: ['./login-usuario.css']
})
export class LoginUsuario {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isValid: boolean | null = null;
  modalOpen: boolean = false;
  modalContent: string = '';

  constructor(
    private router: Router,
    private loginService: LoginUsuarioService
  ) {
    if (typeof window !== 'undefined' && localStorage.getItem('user_auth') === 'true') {
      this.router.navigate(['/dashboard']);
    }
  }

  async handleLogin(event: Event) {
    event.preventDefault();
    try {
      const response = await this.loginService.autenticar(this.email, this.password);
      if (response.status === 200) {
        console.log('Inicio de sesión exitoso:', response.data);
        localStorage.setItem('user_auth', 'true');
        localStorage.setItem('user_email', this.email);
        this.isValid = true;
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      } else {
        this.isValid = false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.isValid = false;
    }
  }

  handleEmployeeLogin() {
    this.router.navigate(['/login']);
  }

  handleRegister() {
    this.router.navigate(['/registro']);
  }

  openModal(content: string) {
    this.modalContent = content;
    this.modalOpen = true;
  }
}
