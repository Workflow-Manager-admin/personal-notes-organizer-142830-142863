import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * PUBLIC_INTERFACE
 * Guard ensures access only for authenticated users.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
