import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Simulate: check if user is "logged in"
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true; // ✅ Allow access
  } else {
    // ❌ Block access, redirect to home with returnUrl
    return router.createUrlTree(['/'], {
      queryParams: { returnUrl: state.url }
    });
  }
};