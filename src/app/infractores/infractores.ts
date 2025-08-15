import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService, Usuario } from '../services/usuarios';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-infractores',
  standalone: true,
  imports: [NgFor],
  templateUrl: './infractores.html',
  styleUrls: ['./infractores.css']
})
export class InfractoresComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al obtener usuarios:', err)
    });
  }

  volverAMenu(): void {
    this.router.navigate(['/menu']);
  }
}
