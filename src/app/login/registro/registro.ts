import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroUsuario {
  formData = {
    nombreU: '',
    apellidoU: '',
    direccion: '',
    telefono: '',
    email: '',
    contrasena: '',
    confirmPassword: ''
  };

  error: string | null = null;
  success: boolean = false;

  constructor(
    public router: Router,
    private registroService: RegistroService
  ) {}

  async handleSubmit(event: Event) {
    event.preventDefault();
    const { nombreU, apellidoU, direccion, telefono, email, contrasena, confirmPassword } = this.formData;

    if (!nombreU || !apellidoU || !direccion || !telefono || !email || !contrasena || !confirmPassword) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    if (contrasena !== confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    try {
      await this.registroService.registrarUsuario({
        nombreU,
        apellidoU,
        direccion,
        telefono,
        email,
        contraseña: contrasena
      });

      this.success = true;
      this.error = null;
      setTimeout(() => this.router.navigate(['/login_user']), 2000);
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      this.error = 'Error al registrar. Intenta nuevamente.';
    }
  }
}
