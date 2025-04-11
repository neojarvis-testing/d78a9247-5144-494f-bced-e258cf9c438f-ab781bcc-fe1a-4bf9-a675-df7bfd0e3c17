import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://ide-eacbeacfbbbdeaffeeddabbccfeabfadfbfdec.premiumproject.examly.io/proxy/8080/api'; 

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(login: Login) {
    this.http.post<{ token: string; userRole: string; username:string }>(`${this.baseUrl}/login`, login).subscribe(
        response => {
            const { token, userRole, username } = response;
 
            // Store token and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('username', username);
 
            // Navigate based on user role
            if (userRole == 'ADMIN') {
                this.router.navigate(['/adminNavbar']); // Navigate to adminnavbar
            } else if (userRole == 'USER') {
                this.router.navigate(['/userNavbar']); // Navigate to usernavbar
            }
        },
        error => {
            console.error('Login failed', error);
        }
    );
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']); 
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');    
    return !!token;
  }

  getUserName(){
    return localStorage.getItem('username');
  }
}
