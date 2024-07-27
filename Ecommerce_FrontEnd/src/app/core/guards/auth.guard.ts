import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/login/auth.service';
import { inject } from '@angular/core';
import { RoleModel } from '../models/login/userModel';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    snackBar.open('🔒 No esta autenticado.', 'Cerrar', {
      duration: 3000
    });
    router.navigate(['access-denied']);
    return false;
  }

  const requiredRole = route.data['requiredRole'];
  const roles: RoleModel[] | null = authService.getRoles();

  if (roles && roles?.some(role => role.name === requiredRole)) {
    return true;
  }

  snackBar.open('🔒 Acceso denegado.', 'Cerrar', {
    duration: 3000
  });
  router.navigate(['access-denied']);
  return false;
};

