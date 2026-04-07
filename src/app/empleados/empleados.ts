import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Empleado {
  id: number;
  nom_Empleado: string;
  apellidoP: string;
  apellidoM: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaIngreso: string;
  nroIdentidad: string;
  estadoCivil: string;
  activo: boolean;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  templateUrl: './empleados.html',
  styleUrls: ['./empleados.css'],
  imports: [CommonModule, FormsModule]
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];
  formData: any = {};
  open = false;
  openConfirmDelete = false;
  editingEmpleado: any = null;
  loading = false;
  errorMessage = '';
  deleteId: number | null = null;
  busqueda = '';

  ngOnInit() {
    this.cargarEmpleados();
  }

  private getStorage(): Empleado[] {
    return JSON.parse(localStorage.getItem('empleados') || '[]');
  }

  private saveStorage(data: Empleado[]) {
    localStorage.setItem('empleados', JSON.stringify(data));
  }

  cargarEmpleados() {
    this.empleados = this.getStorage();
    if (this.empleados.length === 0) {
      this.empleados = [
        { id: 1, nom_Empleado: 'Juan', apellidoP: 'Perez', apellidoM: 'Lopez', email: 'jperez@muni.gob.pe', telefono: '999111222', direccion: 'Av. Lima 123', fechaIngreso: '2024-01-15', nroIdentidad: '12345678', estadoCivil: 'Soltero', activo: true },
        { id: 2, nom_Empleado: 'Ana', apellidoP: 'Gomez', apellidoM: 'Diaz', email: 'agomez@muni.gob.pe', telefono: '999333444', direccion: 'Jr. Arequipa 456', fechaIngreso: '2023-06-20', nroIdentidad: '87654321', estadoCivil: 'Casada', activo: true },
        { id: 3, nom_Empleado: 'Carlos', apellidoP: 'Ruiz', apellidoM: 'Torres', email: 'cruiz@muni.gob.pe', telefono: '999555666', direccion: 'Calle Cusco 789', fechaIngreso: '2024-03-10', nroIdentidad: '11223344', estadoCivil: 'Soltero', activo: false }
      ];
      this.saveStorage(this.empleados);
    }
    this.empleadosFiltrados = [...this.empleados];
  }

  filtrarEmpleados() {
    if (!this.busqueda) {
      this.empleadosFiltrados = [...this.empleados];
      return;
    }
    const q = this.busqueda.toLowerCase();
    this.empleadosFiltrados = this.empleados.filter(e =>
      e.nom_Empleado.toLowerCase().includes(q) ||
      e.apellidoP.toLowerCase().includes(q) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      (e.nroIdentidad && e.nroIdentidad.includes(q))
    );
  }

  getActivos(): number {
    return this.empleados.filter(e => e.activo).length;
  }

  getInactivos(): number {
    return this.empleados.filter(e => !e.activo).length;
  }

  openForm(empleado: any = null) {
    this.editingEmpleado = empleado;
    this.formData = empleado ? { ...empleado } : { activo: true };
    this.open = true;
  }

  saveEmpleado() {
    const all = this.getStorage();
    if (this.editingEmpleado) {
      const idx = all.findIndex(e => e.id === this.editingEmpleado.id);
      if (idx >= 0) all[idx] = { ...all[idx], ...this.formData };
    } else {
      const newId = all.length ? Math.max(...all.map(e => e.id)) + 1 : 1;
      all.push({ ...this.formData, id: newId });
    }
    this.saveStorage(all);
    this.cargarEmpleados();
    this.filtrarEmpleados();
    this.open = false;
  }

  confirmDelete(id: number) {
    this.deleteId = id;
    this.openConfirmDelete = true;
  }

  deleteEmpleado() {
    let all = this.getStorage();
    all = all.filter(e => e.id !== this.deleteId);
    this.saveStorage(all);
    this.cargarEmpleados();
    this.filtrarEmpleados();
    this.openConfirmDelete = false;
  }

  goBack() {
    history.back();
  }
}
