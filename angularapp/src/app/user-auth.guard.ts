import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('userRole'); // Get role from localStorage
    const isAuthenticated = !!localStorage.getItem('token') && role === 'USER';

    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirect if not authenticated as user
      return false;
    }

    return true;
  }
}
