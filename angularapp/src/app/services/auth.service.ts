import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://ide-ffdfacdaffdcdebdeaffeeddabbccfeabfadfbfdec.premiumproject.examly.io/proxy/8080/api'; 

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(login: Login) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, login).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']); 
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');    
    return !!token;
  }
}
