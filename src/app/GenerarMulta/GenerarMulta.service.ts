import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerarMultaService {

  private apiUrl = 'http://localhost:8081/api/email';

  constructor(private http: HttpClient) {}

  enviarCorreoMulta(payload: any) {
  return this.http.post('http://localhost:8081/api/email/enviar-multa', payload, {
    responseType: 'text'
  });
}
}

