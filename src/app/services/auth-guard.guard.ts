import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if ([null, ''].includes(localStorage.getItem('token')))router.navigate(["/connexion"]);
  return true;
};
