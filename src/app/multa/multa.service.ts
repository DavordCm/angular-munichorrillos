import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Multa } from './multa';

@Injectable({
  providedIn: 'root'
})
export class MultaService {

  private listarUrl = 'http://localhost:8081/api/multas/listarmultas';
  private buscarUrl = 'http://localhost:8081/api/multas';
  private eliminarUrl = 'http://localhost:8081/api/multas';

  constructor(private http: HttpClient) { }

  getMultas(): Observable<Multa[]> {
  return this.http.get<Multa[]>(this.listarUrl);
}

eliminar(uid: string): Observable<any> {
  return this.http.delete(`${this.eliminarUrl}/${uid}`);
}
getMultaPorId(uid: string): Observable<Multa> {
  return this.http.get<Multa>(`${this.buscarUrl}/${uid}`);
}

}
