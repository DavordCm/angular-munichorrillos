import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfractoresService } from './infractores.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-infractores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './infractores.html',
  styleUrls: ['./infractores.css']
})
export class InfractoresComponent implements OnInit {
  infractores: any[] = [];
  busquedaUid: string = '';

  // Para el formulario
  nuevoInfractor: any = {
    dniInfractor: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: '',
    password: ''
  };
  editarUid: string | null = null;

  constructor(
    private infractoresService: InfractoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarInfractores();
  }

  cargarInfractores(): void {
    this.infractoresService.obtenerInfractores()
      .then(data => this.infractores = data)
      .catch(err => console.error('Error al obtener infractores:', err));
  }

  buscarInfractor(): void {
    if (!this.busquedaUid) {
      this.cargarInfractores();
      return;
    }
    this.infractoresService.obtenerInfractorPorId(this.busquedaUid)
      .then(data => {
        if (data) {
          this.infractores = [data];
        } else {
          alert('No se encontró infractor con ese UID');
          this.cargarInfractores();
        }
      });
  }

  volverAMenu(): void {
    this.router.navigate(['/menu']);
  }

  // Crear o actualizar
  guardarInfractor(): void {
    if (this.editarUid) {
      // Actualizar
      this.infractoresService.actualizarInfractor(this.editarUid, this.nuevoInfractor)
        .then(data => {
          if (data) {
            alert('Infractor actualizado');
            this.cargarInfractores();
            this.limpiarFormulario();
          }
        });
    } else {
      // Crear
      this.infractoresService.crearInfractor(this.nuevoInfractor)
        .then(data => {
          if (data) {
            alert('Infractor creado');
            this.cargarInfractores();
            this.limpiarFormulario();
          }
        });
    }
  }

  editarInfractor(infractor: any): void {
    this.editarUid = infractor.uidInfractor;
    this.nuevoInfractor = { ...infractor };
  }

  eliminarInfractor(uid: string): void {
    this.infractoresService.eliminarInfractor(uid)
      .then(exito => {
        if (exito) {
          alert('Infractor eliminado');
          this.cargarInfractores();
        }
      });
  }

  limpiarFormulario(): void {
    this.nuevoInfractor = {
      dniInfractor: '',
      nombres: '',
      apellidos: '',
      direccion: '',
      telefono: '',
      email: '',
      password: ''
    };
    this.editarUid = null;
  }
}
