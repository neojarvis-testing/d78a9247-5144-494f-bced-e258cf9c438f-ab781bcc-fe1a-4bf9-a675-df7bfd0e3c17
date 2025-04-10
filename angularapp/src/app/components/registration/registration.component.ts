import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: this.fb.control('', Validators.required),
      mobileNumber: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      role: this.fb.control('', Validators.required)
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value
      ? null : { mismatch: true };
  }

  
onSubmit(): void {
   if (this.registerForm.valid) {
    this.authService.register(this.registerForm.value).subscribe(
     response => {
    console.log('User registered successfully', response);
    this.registerForm.reset();
   },
   error => {
   console.error('Registration failed', error);
    }
    );
   }
  }
  
}
