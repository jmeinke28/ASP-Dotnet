import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.user$.pipe(
    map((user) => {
      // Convert to boolean
      return !!user;
    }),
    tap((isLoggedIn) => {
      /**
       * Recall that isLoggedIn will be the result
       * from what map() returns.
       * */
      if (!isLoggedIn) {
        router.navigate(['/auth/login']);
      }
    })
  );
};
