import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HorarioService } from './horario.service';

const DIAS = [
  { etiqueta: 'Lunes', clave: 'lunes' },
  { etiqueta: 'Martes', clave: 'martes' },
  { etiqueta: 'Miércoles', clave: 'miercoles' },
  { etiqueta: 'Jueves', clave: 'jueves' },
  { etiqueta: 'Viernes', clave: 'viernes' },
  { etiqueta: 'Sábado', clave: 'sabado' },
  { etiqueta: 'Domingo', clave: 'domingo' }
];

@Component({
  standalone: true,
  selector: 'app-horario',
  templateUrl: './horarios.html',
  styleUrls: ['./horarios.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class HorarioComponent {
  horarios: any[] = [];
  horarioEdicion: any = null;
  dias = DIAS;

  constructor(private horarioService: HorarioService, private router: Router) {
    this.cargarHorarios();
  }

  normalizarTexto(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  horarioContieneDia(horario: any, etiqueta: string): boolean {
    const diaNormalizado = this.normalizarTexto(etiqueta);
    return horario.diasTrabajados.includes(diaNormalizado);
  }

  async cargarHorarios(): Promise<void> {
    try {
      const data = await this.horarioService.getHorarios();
      this.horarios = data.map((h: any) => {
        const diasTrabajados = this.dias
          .filter(d => h[d.clave] === 1)
          .map(d => this.normalizarTexto(d.etiqueta));

        return {
          id: h.id_Horario,
          diasTrabajados,
          entrada: h.hingreso,
          salida: h.hsalida,
          empleado: h.id_Empleado.nom_Empleado,
          area: h.id_Area.nom_Area
        };
      });
    } catch (err: any) {
      console.error('Error al cargar horarios:', err);
    }
  }

  editar(horario: any): void {
    this.horarioEdicion = {
      ...horario,
      diasTrabajados: horario.diasTrabajados.map(this.normalizarTexto)
    };
  }

  async eliminar(id: number): Promise<void> {
    try {
      await this.horarioService.deleteHorario(id);
      this.horarios = this.horarios.filter(h => h.id !== id);
    } catch (err: any) {
      console.error('Error al eliminar horario:', err);
    }
  }

  async actualizarHorario(): Promise<void> {
    const diasActualizados: any = {};
    this.dias.forEach(d => {
      const diaNormalizado = this.normalizarTexto(d.etiqueta);
      diasActualizados[d.clave] = this.horarioEdicion.diasTrabajados.includes(diaNormalizado) ? 1 : 0;
    });

    const payload = {
      ...diasActualizados,
      hingreso: this.horarioEdicion.entrada,
      hsalida: this.horarioEdicion.salida
    };

    try {
      await this.horarioService.updateHorario(this.horarioEdicion.id, payload);
      this.horarioEdicion = null;
      this.cargarHorarios();
    } catch (err: any) {
      console.error('Error al actualizar horario:', err);
    }
  }

  cancelarEdicion(): void {
    this.horarioEdicion = null;
  }

  regresar(): void {
    this.router.navigate(['/menu']);
  }
}
