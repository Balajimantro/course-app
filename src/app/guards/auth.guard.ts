import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isUserLoggedIn().pipe(
    map((res: any) => {   
      if (res.message === "Token is valid") { 
        return true; 
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    }),
    catchError((error) => {
      router.navigateByUrl('/login'); 
      return of(false);
    })
  );
};