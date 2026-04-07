import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) {
    if (typeof window !== 'undefined' && localStorage.getItem('user_auth') === 'true') {
      this.router.navigate(['/dashboard']);
    }
  }

  handleLogin(event: Event) {
    event.preventDefault();
    // Buscar en usuarios registrados localmente
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const found = usuarios.find((u: any) => u.email === this.email && u.contrasena === this.password);

    if (found) {
      localStorage.setItem('token', 'true');
      localStorage.setItem('user_auth', 'true');
      localStorage.setItem('username', found.nombre);
      localStorage.setItem('user_email', found.email);
      this.isValid = true;
      setTimeout(() => this.router.navigate(['/dashboard']), 1000);
    } else if (this.email === 'usuario@gmail.com' && this.password === '1234') {
      localStorage.setItem('token', 'true');
      localStorage.setItem('user_auth', 'true');
      localStorage.setItem('username', 'Usuario');
      localStorage.setItem('user_email', 'usuario@gmail.com');
      this.isValid = true;
      setTimeout(() => this.router.navigate(['/dashboard']), 1000);
    } else {
      this.isValid = false;
    }
  }

  handleEmployeeLogin() {
    this.router.navigate(['/login']);
  }

  handleRegister() {
    this.router.navigate(['/register']);
  }

  openModal(content: string) {
    this.modalContent = content;
    this.modalOpen = true;
  }
}
