import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerarMultaService {
  private apiUrl = 'http://localhost:8080/api/email/send';

  constructor(private http: HttpClient) {}

  enviarCorreoMulta(payload: {
    to: string;
    subject: string;
    body: string;
  }): Observable<string> {
    return this.http.post(this.apiUrl, payload, { responseType: 'text' });
  }
}
