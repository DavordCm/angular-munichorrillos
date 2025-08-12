import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private api = 'http://localhost:8081/api/horarios';

  async getHorarios(): Promise<any[]> {
    try {
      const response = await axios.get(this.api);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateHorario(id: number, horario: any): Promise<any> {
    try {
      const response = await axios.put(`${this.api}/${id}`, horario);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteHorario(id: number): Promise<any> {
    try {
      const response = await axios.delete(`${this.api}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
