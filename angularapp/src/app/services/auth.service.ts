import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { Global } from '../resources/global';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = Global.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}
 
  register(user: User) {
    return this.http.post(`${this.baseUrl}/api/register`, user);
  }

  
  login(login: Login) {

    this.http.post<{ token: string; userRole: string; username:string; userId:number}>(`${this.baseUrl}/api/login`, login).subscribe(
        response => {
          console.log(response)
            const { token, userRole, username, userId } = response;

            // Store token and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', userId.toString());


            // Navigate based on user role
            if (userRole == 'ADMIN') {
                this.router.navigate(['/adminNavBar']); // Navigate to adminnavbar
            } else if (userRole == 'USER') {
                this.router.navigate(['/userNavBar']); // Navigate to usernavbar
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
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId')
    this.router.navigate(['/login']); 

  }
 
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');    
    return !!token;
  }

  
  getUsername(): string {
   return localStorage.getItem('username');
  }
  

}

