import { Injectable } from '@angular/core';
import axios from 'axios';
import SHA256 from 'crypto-js/sha256';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {
  private url = 'http://localhost:8081/api/personal';

  async verificarCredenciales(user: string, password: string): Promise<any | null> {
    try {
      const response = await axios.get(this.url);
      const data = response.data;

      const userFound = data.find((item: any) =>
        item.usuarioAcceso === user &&
        item.contraseña === SHA256(password).toString()
      );

      return userFound || null;
    } catch (error) {
      console.error('Error al verificar credenciales:', error);
      throw error;
    }
  }
}
