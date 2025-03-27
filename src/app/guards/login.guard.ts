import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of} from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isUserLoggedIn().pipe(
      map((res: any) => {
        if (res.message === "Token is valid") {
          router.navigate(['/course/dashboard']);
          return false; 
        } else {
          return true;
        }
      }),
      catchError((error) => {
        return of(true); 
      })
    );
};
