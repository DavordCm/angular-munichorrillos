import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Infraccion {
  id_Infraccion?: number;
  nom_Infraccion: string;
  descripcion: string;
  resolucion: string;
  rango: string;
  monto: number;
}

@Injectable({ providedIn: 'root' })
export class InfraccionesService {
  private API_URL = 'http://localhost:8081/api/infracciones';

  constructor(private http: HttpClient) {}

  getInfracciones(): Observable<Infraccion[]> {
    return this.http.get<Infraccion[]>(this.API_URL);
  }

  addInfraccion(data: Infraccion): Observable<Infraccion> {
    return this.http.post<Infraccion>(this.API_URL, data);
  }

  deleteInfraccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
