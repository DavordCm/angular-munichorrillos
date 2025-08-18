import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loggedIn = !!localStorage.getItem('token');

  if (!loggedIn) {
    router.navigate(['/login']);
  }

  return loggedIn;
};
