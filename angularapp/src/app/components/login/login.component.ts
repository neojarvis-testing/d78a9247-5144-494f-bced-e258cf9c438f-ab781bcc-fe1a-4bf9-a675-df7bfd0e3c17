import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  

  onSubmit(): void {
       if (this.loginForm.valid) {
      //  console.log('Login form is valid. Submitting:', this.loginForm.value);
       this.authService.login(this.loginForm.value);
       } else {
       console.error('Login form is invalid:', this.loginForm.errors);
       
       }
     }
    
  
}
