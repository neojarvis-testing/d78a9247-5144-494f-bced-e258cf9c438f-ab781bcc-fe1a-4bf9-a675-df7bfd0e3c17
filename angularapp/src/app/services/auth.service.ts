import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { Global } from '../resources/global';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = Global.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}
 
  register(user: User) {
    if(localStorage.getItem('token')){
      localStorage.clear()
    }
    return this.http.post(`${this.baseUrl}/api/register`, user);
  }

  
  login(login: Login): Observable<{ token: string; userRole: string; username: string; userId: number }> {
    return this.http.post<{ token: string; userRole: string; username: string; userId: number }>(
      `${this.baseUrl}/api/login`,
      login
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

  

  updatePassword(email: string, newPassword: string): Observable<any> {
     return this.http.post(`${this.baseUrl}/api/update-password`, { email, newPassword });
  }
    
  

}

