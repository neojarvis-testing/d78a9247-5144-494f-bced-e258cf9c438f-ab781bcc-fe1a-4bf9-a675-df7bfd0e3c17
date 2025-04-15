import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage:string | null = null

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
  
          const { token, userRole, username, userId } = response;
          localStorage.setItem('token', token);
          localStorage.setItem('userRole', userRole);
          localStorage.setItem('username', username);
          localStorage.setItem('userId', userId.toString());
  
          // Navigate based on user role
          if (userRole === 'ADMIN') {
            this.router.navigate(['/adminNavBar']);
          } else if (userRole === 'USER') {
            this.router.navigate(['/userNavBar']);
          }
        },
        error: (err) => {
          this.errorMessage = 'Incorrect username or password. If not registered please click on register'
          setTimeout(() => {
            this.errorMessage = null;
            this.loginForm.reset();
          }, 3000);
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields with valid data.';
      setTimeout(() => {
        this.errorMessage = null;
        this.loginForm.reset();
      }, 3000);
    }
  }
  
  
    
  
}
