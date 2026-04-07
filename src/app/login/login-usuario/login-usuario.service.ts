import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginUsuarioService {
  private apiUrl = 'http://localhost:8081/api/usuarios/login';

  async autenticar(email: string, contrasena: string): Promise<any> {
    const response = await axios.post(this.apiUrl, { email, contrasena });
    return response;
  }
}
