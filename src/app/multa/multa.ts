import { Component, OnInit } from '@angular/core';
import { MultaService } from './multa.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

export interface Multa {
  uidMulta: string;
  fechaMulta: string;
  horaMulta: string;
  lugarMulta: string;
  distritoMulta: string;
  serieMulta: string;
  placa: string;
  marca: string;
  modelo: string;
  nroMotor: string;
  anio: number;
  color: string;
  estado: boolean;
  propietario: string;
  dniInfractor: string;
  email: string;
  direccion: string;
  grua: boolean;
  dniEmpleado: string;
  codInfraccion: string;
  deposito: string;
  estadoPago: boolean;
  codigoPago: string;
  telefono: string;
  observaciones: string;
  imagen: string;
  montoMulta: number;
}

@Component({
  selector: 'app-multa',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './multa.html',
  styleUrls: ['./multa.css'],
  providers: [CurrencyPipe]
})
export class MultaComponent implements OnInit {

  multas: Multa[] = [];
  busquedaUid: string = '';

  constructor(
    private multaService: MultaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMultas();
  }

  cargarMultas() {
    this.multaService.getMultas().subscribe(data => this.multas = data);
  }

  buscarMulta() {
    if (!this.busquedaUid) {
      this.cargarMultas();
      return;
    }
    this.multaService.getMultaPorId(this.busquedaUid).subscribe({
      next: (data) => this.multas = [data],
      error: () => alert('No se encontró la multa con ese UID')
    });
  }

  eliminar(uid: string) {
    if(confirm('¿Seguro de eliminar esta multa?')) {
      this.multaService.eliminar(uid).subscribe(() => this.cargarMultas());
    }
  }

  volverAlMenu() {
    this.router.navigate(['/menu']);
  }
}
