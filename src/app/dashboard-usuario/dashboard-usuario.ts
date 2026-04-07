import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Multa {
  id: number;
  serie: string;
  fecha: string;
  placa: string;
  descripcion: string;
  monto: number;
  estado: string;
}

@Component({
  selector: 'app-dashboard-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-usuario.html',
  styleUrls: ['./dashboard-usuario.css']
})
export class DashboardUsuarioComponent implements OnInit {
  username = '';
  userEmail = '';
  activeTab = 'inicio';
  busquedaPlaca = '';

  // Multas del usuario
  multasUsuario: Multa[] = [];
  multasFiltradas: Multa[] = [];

  // Perfil
  perfil: any = {};
  editandoPerfil = false;
  perfilForm: any = {};

  // Reclamo
  reclamoForm: any = { asunto: '', descripcion: '', tipo: 'Queja' };
  reclamos: any[] = [];
  reclamoEnviado = false;
  today = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.username = localStorage.getItem('username') || 'Usuario';
      this.userEmail = localStorage.getItem('user_email') || 'usuario@gmail.com';
      this.cargarDatos();
    }
  }

  cargarDatos() {
    // Cargar multas
    const multas = JSON.parse(localStorage.getItem('multas_usuario') || '[]');
    if (multas.length === 0) {
      this.multasUsuario = [
        { id: 1, serie: 'M-2024-001', fecha: '2024-07-20', placa: 'ABC-123', descripcion: 'Estacionamiento indebido en zona rigida', monto: 150, estado: 'Pendiente' },
        { id: 2, serie: 'M-2024-005', fecha: '2024-08-15', placa: 'ABC-123', descripcion: 'Exceso de velocidad en zona escolar', monto: 500, estado: 'Pagada' },
        { id: 3, serie: 'M-2024-012', fecha: '2024-09-03', placa: 'DEF-456', descripcion: 'Comercio ambulatorio sin licencia', monto: 300, estado: 'Pendiente' }
      ];
      localStorage.setItem('multas_usuario', JSON.stringify(this.multasUsuario));
    } else {
      this.multasUsuario = multas;
    }
    this.multasFiltradas = [...this.multasUsuario];

    // Cargar perfil
    const perfil = JSON.parse(localStorage.getItem('perfil_usuario') || '{}');
    if (!perfil.nombre) {
      this.perfil = {
        nombre: this.username,
        email: this.userEmail,
        telefono: '999 888 777',
        direccion: 'Av. Chorrillos 123',
        dni: '12345678'
      };
      localStorage.setItem('perfil_usuario', JSON.stringify(this.perfil));
    } else {
      this.perfil = perfil;
    }

    // Cargar reclamos
    this.reclamos = JSON.parse(localStorage.getItem('reclamos_usuario') || '[]');
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // Multas
  buscarMulta() {
    if (!this.busquedaPlaca) {
      this.multasFiltradas = [...this.multasUsuario];
      return;
    }
    this.multasFiltradas = this.multasUsuario.filter(m =>
      m.placa.toLowerCase().includes(this.busquedaPlaca.toLowerCase()) ||
      m.serie.toLowerCase().includes(this.busquedaPlaca.toLowerCase())
    );
  }

  getTotalPendiente(): number {
    return this.multasUsuario.filter(m => m.estado === 'Pendiente').reduce((sum, m) => sum + m.monto, 0);
  }

  getCantidadPendiente(): number {
    return this.multasUsuario.filter(m => m.estado === 'Pendiente').length;
  }

  getCantidadPagada(): number {
    return this.multasUsuario.filter(m => m.estado === 'Pagada').length;
  }

  // Perfil
  editarPerfil() {
    this.perfilForm = { ...this.perfil };
    this.editandoPerfil = true;
  }

  guardarPerfil() {
    this.perfil = { ...this.perfilForm };
    localStorage.setItem('perfil_usuario', JSON.stringify(this.perfil));
    this.editandoPerfil = false;
  }

  // Reclamos
  enviarReclamo() {
    if (!this.reclamoForm.asunto || !this.reclamoForm.descripcion) return;

    const nuevoReclamo = {
      id: this.reclamos.length + 1,
      ...this.reclamoForm,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Recibido'
    };
    this.reclamos.push(nuevoReclamo);
    localStorage.setItem('reclamos_usuario', JSON.stringify(this.reclamos));
    this.reclamoForm = { asunto: '', descripcion: '', tipo: 'Queja' };
    this.reclamoEnviado = true;
    setTimeout(() => this.reclamoEnviado = false, 3000);
  }

  handleSalir() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_auth');
    localStorage.removeItem('user_email');
    this.router.navigate(['/login_user']);
  }
}
