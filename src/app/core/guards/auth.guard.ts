import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta según tu proyecto

interface JwtPayload {
  exp?: number; // Fecha de expiración en timestamp (segundos)
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true; // Si no tiene expiración, lo consideramos inválido
    const now = Date.now() / 1000; // timestamp en segundos
    return decoded.exp < now;
  } catch (error) {
    return true; // Si hay error al decodificar, consideramos token inválido
  }
}

export const authGuard: CanActivateFn = (
  route,
  state
): boolean | UrlTree | Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtén token desde el servicio o almacenamiento local/session
  const token = authService.getToken() || sessionStorage.getItem('token');

  // Si no hay token o está expirado, redirige al login
  if (!token || isTokenExpired(token)) {
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  // Si todo bien, permite acceso
  return true;
};
