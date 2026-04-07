import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface Multa {
  id: number;
  serieMulta: string;
  fechaMulta: string;
  horaMulta: string;
  placa: string;
  propietario: string;
  montoMulta: number;
}

@Component({
  selector: 'app-multa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multa.html',
  styleUrls: ['./multa.css'],
  providers: [CurrencyPipe]
})
export class MultaComponent implements OnInit {
  multas: Multa[] = [];
  busquedaUid: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarMultas();
  }

  private getStorage(): Multa[] {
    return JSON.parse(localStorage.getItem('multas') || '[]');
  }

  private saveStorage(data: Multa[]) {
    localStorage.setItem('multas', JSON.stringify(data));
  }

  cargarMultas() {
    this.multas = this.getStorage();
    if (this.multas.length === 0) {
      this.multas = [
        { id: 1, serieMulta: 'M-2024-001', fechaMulta: '2024-07-20', horaMulta: '10:30', placa: 'ABC-123', propietario: 'Pedro Martinez', montoMulta: 150 },
        { id: 2, serieMulta: 'M-2024-002', fechaMulta: '2024-07-21', horaMulta: '14:15', placa: 'XYZ-789', propietario: 'Maria Sanchez', montoMulta: 500 },
        { id: 3, serieMulta: 'M-2024-003', fechaMulta: '2024-08-05', horaMulta: '09:00', placa: 'DEF-456', propietario: 'Carlos Ruiz', montoMulta: 300 }
      ];
      this.saveStorage(this.multas);
    }
  }

  buscarMulta() {
    if (!this.busquedaUid) {
      this.cargarMultas();
      return;
    }
    const all = this.getStorage();
    const found = all.filter(m => m.id.toString() === this.busquedaUid || m.serieMulta.toLowerCase().includes(this.busquedaUid.toLowerCase()) || m.placa.toLowerCase().includes(this.busquedaUid.toLowerCase()));
    this.multas = found;
  }

  eliminar(id: number) {
    if (confirm('Seguro de eliminar esta multa?')) {
      let all = this.getStorage();
      all = all.filter(m => m.id !== id);
      this.saveStorage(all);
      this.cargarMultas();
    }
  }

  volverAlMenu() {
    this.router.navigate(['/menu']);
  }
}
