import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InfractoresService {
  private url = 'http://localhost:8081/api/infractores';

  async obtenerInfractores(): Promise<any[]> {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      console.error('Error al obtener infractores:', error);
      return [];
    }
  }

  async crearInfractor(infractor: any): Promise<any | null> {
    try {
      const response = await axios.post(this.url, infractor);
      return response.data;
    } catch (error) {
      console.error('Error al crear infractor:', error);
      return null;
    }
  }

  async actualizarInfractor(uid: string, infractor: any): Promise<any | null> {
    try {
      const response = await axios.put(`${this.url}/${uid}`, infractor);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar infractor:', error);
      return null;
    }
  }

  async eliminarInfractor(uid: string): Promise<boolean> {
    try {
      await axios.delete(`${this.url}/${uid}`);
      return true;
    } catch (error) {
      console.error('Error al eliminar infractor:', error);
      return false;
    }
  }

  async obtenerInfractorPorId(uid: string): Promise<any | null> {
    try {
      const response = await axios.get(`${this.url}/${uid}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener infractor:', error);
      return null;
    }
  }
}
