import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) {
    if (typeof window !== 'undefined' && localStorage.getItem('token') === 'true') {
      this.router.navigate(['/menu']);
    }
  }

  handleLogin(event: Event) {
    event.preventDefault();
    if (this.user === 'admin' && this.password === '1234') {
      localStorage.setItem('token', 'true');
      localStorage.setItem('username', 'Administrador');
      this.isValid = true;
      setTimeout(() => this.router.navigate(['/menu']), 1000);
    } else {
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
