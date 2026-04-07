import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Infraccion {
  id: number;
  codInfraccion: string;
  nomInfraccion: string;
  descripcion: string;
  resolucion: string;
  rango: string;
  monto: number;
}

@Component({
  selector: 'app-infracciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './infracciones.html',
  styleUrls: ['./infracciones.css']
})
export class InfraccionesComponent implements OnInit {
  infracciones: Infraccion[] = [];
  busquedaUid: string = '';
  showForm = false;

  nuevaInfraccion: any = { codInfraccion: '', nomInfraccion: '', descripcion: '', resolucion: '', rango: '', monto: 0 };
  editarId: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarInfracciones();
  }

  private getStorage(): Infraccion[] {
    return JSON.parse(localStorage.getItem('infracciones') || '[]');
  }

  private saveStorage(data: Infraccion[]) {
    localStorage.setItem('infracciones', JSON.stringify(data));
  }

  cargarInfracciones() {
    this.infracciones = this.getStorage();
    if (this.infracciones.length === 0) {
      this.infracciones = [
        { id: 1, codInfraccion: 'INF-001', nomInfraccion: 'Ord. 033', descripcion: 'Estacionamiento indebido', resolucion: 'Res. 001', rango: 'Leve', monto: 150 },
        { id: 2, codInfraccion: 'INF-002', nomInfraccion: 'Ord. 045', descripcion: 'Exceso de velocidad', resolucion: 'Res. 002', rango: 'Grave', monto: 500 },
        { id: 3, codInfraccion: 'INF-003', nomInfraccion: 'Ord. 078', descripcion: 'Comercio ambulatorio', resolucion: 'Res. 003', rango: 'Moderada', monto: 300 }
      ];
      this.saveStorage(this.infracciones);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.limpiarFormulario();
  }

  buscarInfraccion() {
    if (!this.busquedaUid) {
      this.cargarInfracciones();
      return;
    }
    const all = this.getStorage();
    const found = all.filter(i => i.id.toString() === this.busquedaUid || i.codInfraccion.toLowerCase().includes(this.busquedaUid.toLowerCase()));
    this.infracciones = found;
  }

  guardarInfraccion() {
    const all = this.getStorage();
    if (this.editarId) {
      const idx = all.findIndex(i => i.id === this.editarId);
      if (idx >= 0) all[idx] = { ...all[idx], ...this.nuevaInfraccion };
    } else {
      const newId = all.length ? Math.max(...all.map(i => i.id)) + 1 : 1;
      all.push({ ...this.nuevaInfraccion, id: newId });
    }
    this.saveStorage(all);
    this.cargarInfracciones();
    this.limpiarFormulario();
    this.showForm = false;
  }

  editarInfraccion(inf: Infraccion) {
    this.editarId = inf.id;
    this.nuevaInfraccion = { ...inf };
    this.showForm = true;
  }

  eliminarInfraccion(id: number) {
    if (confirm('Seguro que deseas eliminar esta infraccion?')) {
      let all = this.getStorage();
      all = all.filter(i => i.id !== id);
      this.saveStorage(all);
      this.cargarInfracciones();
    }
  }

  limpiarFormulario() {
    this.nuevaInfraccion = { codInfraccion: '', nomInfraccion: '', descripcion: '', resolucion: '', rango: '', monto: 0 };
    this.editarId = null;
  }

  volverAlMenu() {
    this.router.navigate(['/menu']);
  }
}
