import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {
  private url = 'http://localhost:8081/api/usuarios/login';

  async verificarCredenciales(user: string, password: string): Promise<any | null> {
    try {
      // 🔹 Enviar credenciales al backend
      const response = await axios.post(this.url, {
        email: user,
        contrasena: password // sin ñ
      });

      // Si el backend responde con un usuario válido
      if (response.data) {
        return response.data;
      }
      return null;
    } catch (error: any) {
      console.error('Error al verificar credenciales:', error);

      // Si el backend responde 401 → credenciales incorrectas
      if (error.response && error.response.status === 401) {
        return null;
      }

      throw error;
    }
  }
}
