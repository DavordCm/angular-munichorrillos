import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfraccionesService, Infraccion } from './infracciones.service';

@Component({
  selector: 'app-infracciones',
  imports: [CommonModule],
  templateUrl: './infracciones.html',
  styleUrls: ['./infracciones.css']
})
export class InfraccionesComponent implements OnInit {
  infracciones: Infraccion[] = [];

  constructor(private infraccionesService: InfraccionesService) {}

  ngOnInit() {
    this.cargarInfracciones();
  }

  cargarInfracciones() {
    this.infraccionesService.getInfracciones().subscribe({
      next: (data) => this.infracciones = data,
      error: (err) => console.error('Error al cargar infracciones', err)
    });
  }

  agregarInfraccion(
    nom: string,
    descripcion: string,
    resolucion: string,
    rango: string,
    monto: string
  ) {
    const nueva: Infraccion = {
      nom_Infraccion: nom.trim(),
      descripcion: descripcion.trim(),
      resolucion: resolucion.trim(),
      rango: rango.trim(),
      monto: parseFloat(monto) || 0
    };

    if (!nueva.nom_Infraccion) return;

    this.infraccionesService.addInfraccion(nueva).subscribe({
      next: () => this.cargarInfracciones(),
      error: (err) => console.error('Error al agregar infracción', err)
    });
  }

  eliminarInfraccion(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta infracción?')) {
      this.infraccionesService.deleteInfraccion(id).subscribe({
        next: () => this.cargarInfracciones(),
        error: (err) => console.error('Error al eliminar infracción', err)
      });
    }
  }
}
