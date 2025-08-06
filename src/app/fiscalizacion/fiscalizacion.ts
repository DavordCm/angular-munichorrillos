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
  const cuerpo = `
  ⚠️ AVISO IMPORTANTE ⚠️

Estimado(a) ciudadano(a),

Se le comunica que se ha generado una multa por una infracción al reglamento de tránsito.
Adjunto a este mensaje encontrará un documento PDF con los detalles correspondientes.

Por favor, revise la información y proceda con el pago dentro del plazo establecido.

Atentamente,
Municipalidad de Chorrillos
Subgerencia de Fiscalización

--- Información Vehicular ---
Placa: ${this.form.placa}
Año: ${this.form.anio}
Motor: ${this.form.motor}
Marca: ${this.form.marca}
Color: ${this.form.color}
Estado: ${this.form.estado}
Modelo: ${this.form.modelo}

--- Información del Infractor ---
Propietario: ${this.form.propietario}
Teléfono: ${this.form.telefono}
Dirección: ${this.form.direccion}
Email: ${this.form.email}

--- Información Municipal ---
Fiscalizador: ${this.form.fiscalizador}
Depósito: ${this.form.deposito}
Grúa: ${this.form.grua}
Lugar: ${this.form.lugar}
Distrito: ${this.form.distrito}
Ordenanza: ${this.form.ordenanza}
Descripción: ${this.form.descripcion}
Observaciones: ${this.form.observaciones}

Código de Pago: [CODIGO_PAGO]
Monto a Pagar: S/ ${this.form.monto}

Atentamente,
Municipalidad de Chorrillos
Subgerencia de Fiscalización
`;

  const payload = {
    to: this.form.email,
    subject: 'Multa - Municipalidad de Chorrillos',
    body: cuerpo
  };

  this.multaService.enviarCorreoMulta(payload).subscribe({
    next: res => alert('Correo enviado correctamente.'),
    error: err => alert('Error al enviar correo.')
  });
}

}
