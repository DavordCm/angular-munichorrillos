import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Infraccion {
  uidInfraccion?: string;
  codInfraccion: string;
  nomInfraccion: string;
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

  getInfraccionPorId(uid: string): Observable<Infraccion> {
    return this.http.get<Infraccion>(`${this.API_URL}/${uid}`);
  }

  addInfraccion(data: Infraccion): Observable<Infraccion> {
    return this.http.post<Infraccion>(this.API_URL, data);
  }

  updateInfraccion(uid: string, data: Infraccion): Observable<Infraccion> {
    return this.http.put<Infraccion>(`${this.API_URL}/${uid}`, data);
  }

  deleteInfraccion(uid: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${uid}`);
  }
}
