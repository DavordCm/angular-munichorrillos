import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from './empleado.service';

@Component({
  selector: 'app-empleados',
  standalone: true,
  templateUrl: './empleados.html',
  styleUrls: ['./empleados.css'],
  imports: [CommonModule, FormsModule] // ✅ Aquí está la clave
})
export class EmpleadosComponent {
  empleados: any[] = [];
  formData: any = {};
  open = false;
  openConfirmDelete = false;
  editingEmpleado: any = null;
  loading = false;
  errorMessage = '';

  private empleadoService = inject(EmpleadoService);

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.loading = true;
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar empleados';
        this.loading = false;
      }
    });
  }

  openForm(empleado: any = null) {
  this.editingEmpleado = empleado;
  this.formData = empleado ? { ...empleado } : {};
  this.open = true;
}

saveEmpleado() {
  const req = this.editingEmpleado
    ? this.empleadoService.updateEmpleado(this.editingEmpleado.id_Empleado, this.formData)
    : this.empleadoService.addEmpleado(this.formData);

  req.subscribe({
    next: () => {
      this.cargarEmpleados();
      this.open = false;
    },
    error: () => {
      this.errorMessage = 'Error al guardar el empleado';
    }
  });
}


  confirmDelete(id: number) {
    this.editingEmpleado = { id };
    this.openConfirmDelete = true;
  }

  deleteEmpleado() {
    this.empleadoService.deleteEmpleado(this.editingEmpleado.id).subscribe({
      next: () => {
        this.cargarEmpleados();
        this.openConfirmDelete = false;
      },
      error: () => {
        this.errorMessage = 'Error al eliminar empleado';
      }
    });
  }

  goBack() {
    history.back();
  }
}
