import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenerarMultaService } from '../GenerarMulta/GenerarMulta.service';

@Component({
  selector: 'app-fiscalizacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fiscalizacion.html',
  styleUrls: ['./fiscalizacion.css']
})
export class FiscalizacionComponent {
  form: any = {};

  constructor(private multaService: GenerarMultaService) {}

  enviarCorreo() {
    const payload = {
      to: this.form.email,
      subject: 'Multa - Municipalidad de Chorrillos',
      datos: { ...this.form }
    };

    this.multaService.enviarCorreoMulta(payload).subscribe({
      next: res => alert('Correo enviado correctamente.'),
      error: err => alert('Error al enviar correo.')
    });
  }
}
