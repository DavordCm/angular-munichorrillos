import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Infractor {
  id: number;
  dniInfractor: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  email: string;
}

@Component({
  selector: 'app-infractores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './infractores.html',
  styleUrls: ['./infractores.css']
})
export class InfractoresComponent implements OnInit {
  infractores: Infractor[] = [];
  busquedaUid: string = '';
  showForm = false;

  nuevoInfractor: any = { dniInfractor: '', nombres: '', apellidos: '', direccion: '', telefono: '', email: '' };
  editarUid: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarInfractores();
  }

  private getStorage(): Infractor[] {
    return JSON.parse(localStorage.getItem('infractores') || '[]');
  }

  private saveStorage(data: Infractor[]) {
    localStorage.setItem('infractores', JSON.stringify(data));
  }

  cargarInfractores() {
    this.infractores = this.getStorage();
    if (this.infractores.length === 0) {
      this.infractores = [
        { id: 1, dniInfractor: '12345678', nombres: 'Pedro', apellidos: 'Martinez', direccion: 'Av. Grau 100', telefono: '999888777', email: 'pmartinez@mail.com' },
        { id: 2, dniInfractor: '87654321', nombres: 'Maria', apellidos: 'Sanchez', direccion: 'Jr. Union 200', telefono: '999666555', email: 'msanchez@mail.com' }
      ];
      this.saveStorage(this.infractores);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.limpiarFormulario();
  }

  buscarInfractor() {
    if (!this.busquedaUid) {
      this.cargarInfractores();
      return;
    }
    const all = this.getStorage();
    const found = all.filter(i => i.id.toString() === this.busquedaUid || i.dniInfractor.includes(this.busquedaUid));
    this.infractores = found;
  }

  guardarInfractor() {
    const all = this.getStorage();
    if (this.editarUid) {
      const idx = all.findIndex(i => i.id === this.editarUid);
      if (idx >= 0) all[idx] = { ...all[idx], ...this.nuevoInfractor };
    } else {
      const newId = all.length ? Math.max(...all.map(i => i.id)) + 1 : 1;
      all.push({ ...this.nuevoInfractor, id: newId });
    }
    this.saveStorage(all);
    this.cargarInfractores();
    this.limpiarFormulario();
    this.showForm = false;
  }

  editarInfractor(infractor: Infractor) {
    this.editarUid = infractor.id;
    this.nuevoInfractor = { ...infractor };
    this.showForm = true;
  }

  eliminarInfractor(id: number) {
    if (confirm('Seguro que deseas eliminar este infractor?')) {
      let all = this.getStorage();
      all = all.filter(i => i.id !== id);
      this.saveStorage(all);
      this.cargarInfractores();
    }
  }

  limpiarFormulario() {
    this.nuevoInfractor = { dniInfractor: '', nombres: '', apellidos: '', direccion: '', telefono: '', email: '' };
    this.editarUid = null;
  }

  volverAMenu() {
    this.router.navigate(['/menu']);
  }
}
