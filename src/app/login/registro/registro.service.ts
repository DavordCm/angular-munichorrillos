import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:8081/api/usuarios/registrar';

  async registrarUsuario(usuario: any): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, usuario);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
