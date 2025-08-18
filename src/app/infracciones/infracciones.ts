import { Component, OnInit } from '@angular/core';
import { InfraccionesService, Infraccion } from './infracciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  // Formulario Crear/Editar
  nuevaInfraccion: Infraccion = {
    codInfraccion: '',
    nomInfraccion: '',
    descripcion: '',
    resolucion: '',
    rango: '',
    monto: 0
  };
  editarId: string | null = null;

  constructor(
    private infraccionesService: InfraccionesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarInfracciones();
  }

  cargarInfracciones() {
    this.infraccionesService.getInfracciones().subscribe({
      next: (data) => this.infracciones = data,
      error: (err) => console.error('Error al cargar infracciones', err)
    });
  }

  buscarInfraccion() {
    if (!this.busquedaUid) {
      this.cargarInfracciones();
      return;
    }
    this.infraccionesService.getInfraccionPorId(this.busquedaUid).subscribe({
      next: (data) => this.infracciones = data ? [data] : [],
      error: () => {
        alert('No se encontró la infracción con ese ID');
        this.cargarInfracciones();
      }
    });
  }

  guardarInfraccion() {
    if (this.editarId) {
      // Actualizar
      this.infraccionesService.updateInfraccion(this.editarId, this.nuevaInfraccion).subscribe({
        next: () => {
          alert('Infracción actualizada');
          this.cargarInfracciones();
          this.limpiarFormulario();
        },
        error: (err) => console.error('Error al actualizar infracción', err)
      });
    } else {
      // Crear
      this.infraccionesService.addInfraccion(this.nuevaInfraccion).subscribe({
        next: () => {
          alert('Infracción agregada');
          this.cargarInfracciones();
          this.limpiarFormulario();
        },
        error: (err) => console.error('Error al agregar infracción', err)
      });
    }
  }

  editarInfraccion(inf: Infraccion) {
    this.editarId = inf.uidInfraccion!;
    this.nuevaInfraccion = { ...inf };
  }

  eliminarInfraccion(uid: string) {
    if (confirm('¿Seguro que deseas eliminar esta infracción?')) {
      this.infraccionesService.deleteInfraccion(uid).subscribe({
        next: () => this.cargarInfracciones(),
        error: (err) => console.error('Error al eliminar infracción', err)
      });
    }
  }

  limpiarFormulario() {
    this.nuevaInfraccion = {
      codInfraccion: '',
      nomInfraccion: '',
      descripcion: '',
      resolucion: '',
      rango: '',
      monto: 0
    };
    this.editarId = null;
  }

  volverAlMenu() {
    this.router.navigate(['/menu']);
  }
}
