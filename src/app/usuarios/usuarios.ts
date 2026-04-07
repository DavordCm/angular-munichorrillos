import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  email: string;
  contrasena: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;
  errorMessage = '';
  busquedaId = '';

  open = false;
  openConfirmDelete = false;
  editingUsuario: Usuario | null = null;
  deleteId: number | null = null;

  formData: any = { nombre: '', apellido: '', direccion: '', telefono: '', email: '', contrasena: '' };

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  private getStorage(): Usuario[] {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  private saveStorage(data: Usuario[]) {
    localStorage.setItem('usuarios', JSON.stringify(data));
  }

  cargarUsuarios() {
    this.usuarios = this.getStorage();
    if (this.usuarios.length === 0) {
      // Datos iniciales
      this.usuarios = [
        { id: 1, nombre: 'Juan', apellido: 'Perez', direccion: 'Av. Lima 123', telefono: '999111222', email: 'jperez@mail.com', contrasena: '1234' },
        { id: 2, nombre: 'Ana', apellido: 'Gomez', direccion: 'Jr. Arequipa 456', telefono: '999333444', email: 'agomez@mail.com', contrasena: '5678' },
        { id: 3, nombre: 'Carlos', apellido: 'Ruiz', direccion: 'Calle Cusco 789', telefono: '999555666', email: 'cruiz@mail.com', contrasena: 'abcd' }
      ];
      this.saveStorage(this.usuarios);
    }
  }

  buscarUsuario() {
    if (!this.busquedaId) {
      this.cargarUsuarios();
      return;
    }
    const all = this.getStorage();
    const found = all.filter(u => u.id.toString() === this.busquedaId);
    this.usuarios = found.length ? found : [];
    if (!found.length) this.errorMessage = 'No se encontro el usuario';
  }

  openForm(usuario: Usuario | null = null) {
    this.editingUsuario = usuario;
    this.formData = usuario
      ? { ...usuario, contrasena: '' }
      : { nombre: '', apellido: '', direccion: '', telefono: '', email: '', contrasena: '' };
    this.open = true;
  }

  saveUsuario() {
    const all = this.getStorage();
    if (this.editingUsuario) {
      const idx = all.findIndex(u => u.id === this.editingUsuario!.id);
      if (idx >= 0) {
        all[idx] = { ...all[idx], ...this.formData };
        if (!this.formData.contrasena) all[idx].contrasena = this.editingUsuario.contrasena;
      }
    } else {
      const newId = all.length ? Math.max(...all.map(u => u.id)) + 1 : 1;
      all.push({ ...this.formData, id: newId });
    }
    this.saveStorage(all);
    this.cargarUsuarios();
    this.open = false;
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    this.openConfirmDelete = true;
  }

  deleteUsuario() {
    let all = this.getStorage();
    all = all.filter(u => u.id !== this.deleteId);
    this.saveStorage(all);
    this.cargarUsuarios();
    this.openConfirmDelete = false;
  }

  goBack() {
    this.router.navigate(['/menu']);
  }
}
