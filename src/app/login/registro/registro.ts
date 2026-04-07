import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroUsuario {
  formData = {
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    email: '',
    contrasena: '',
    confirmPassword: ''
  };

  error: string | null = null;
  success: boolean = false;

  constructor(public router: Router) {}

  handleSubmit(event: Event) {
    event.preventDefault();
    const { nombre, apellido, direccion, telefono, email, contrasena, confirmPassword } = this.formData;

    if (!nombre || !apellido || !direccion || !telefono || !email || !contrasena || !confirmPassword) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    if (contrasena !== confirmPassword) {
      this.error = 'Las contrasenas no coinciden.';
      return;
    }

    // Guardar en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const existe = usuarios.find((u: any) => u.email === email);
    if (existe) {
      this.error = 'Ya existe un usuario con ese email.';
      return;
    }

    usuarios.push({
      id: usuarios.length + 1,
      nombre,
      apellido,
      direccion,
      telefono,
      email,
      contrasena
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.success = true;
    this.error = null;
    setTimeout(() => this.router.navigate(['/login_user']), 2000);
  }
}
