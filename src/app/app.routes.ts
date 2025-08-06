import { Routes } from '@angular/router';
import { LoginAdmin } from './login/login-admin/login-admin';

export const routes: Routes = [
  {
    path: '',
    component: LoginAdmin,
  },
  {
    path: 'login_user',
    loadComponent: () =>
      import('./login/login-usuario/login-usuario').then(m => m.LoginUsuario),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./login/registro/registro').then(m => m.RegistroUsuario),
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./menu/menu').then(m => m.MenuComponent),
  }
];
