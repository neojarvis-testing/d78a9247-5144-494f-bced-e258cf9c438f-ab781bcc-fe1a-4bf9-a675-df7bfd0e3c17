import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('userRole'); // Get role from localStorage
    const isAuthenticated = !!localStorage.getItem('token') && role === 'ADMIN';

    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirect if not authenticated as admin
      return false;
    }

    return true;
  }
}
