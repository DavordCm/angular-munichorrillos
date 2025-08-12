import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginUsuarioService {
  private apiUrl = 'http://localhost:8081/api/usuarios/login/authenticate';

  async autenticar(email: string, contraseña: string): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, { email, contraseña });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
