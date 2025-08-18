// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authGuard } from './core/auth.guard';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./app/login/login-admin/login-admin').then(m => m.LoginAdmin)
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./app/menu/menu').then(m => m.MenuComponent),
    canActivate: [authGuard]
  },
  {
  path: 'multa',
  loadComponent: () =>
    import('./app/multa/multa').then(m => m.MultaComponent)
}
,
  {
    path: 'empleados',
    loadComponent: () =>
      import('./app/empleados/empleados').then(m => m.EmpleadosComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login_user',
    loadComponent: () =>
      import('./app/login/login-usuario/login-usuario').then(m => m.LoginUsuario)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./app/login/registro/registro').then(m => m.RegistroUsuario)
  },
  {
    path: 'infracciones',
    loadComponent: () =>
      import('./app/infracciones/infracciones').then(m => m.InfraccionesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'infractores',
    loadComponent: () =>
      import('./app/infractores/infractores').then(m => m.InfractoresComponent),
    canActivate: [authGuard]
  },
  {
    path: 'fiscalizacion',
    loadComponent: () =>
      import('./app/fiscalizacion/fiscalizacion').then(m => m.FiscalizacionComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()
  ]
});
