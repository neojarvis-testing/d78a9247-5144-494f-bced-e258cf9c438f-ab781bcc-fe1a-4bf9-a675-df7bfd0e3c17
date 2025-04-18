import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  registrationSuccess: boolean = false;
  errorMessage: string | null = null;
  private subscriptions: Subscription = new Subscription(); // Manage subscriptions

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-z]+$'),
        Validators.minLength(6) 
      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$') 
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{6,}$') 
      ]),
      confirmPassword: this.fb.control('', Validators.required),
      mobileNumber: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$') // Ensures exactly 10 digits
      ]),
      userRole: this.fb.control('', Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerSubscription = this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          this.registerForm.reset();
          this.registrationSuccess = true;
        },
        error: () => {
          this.errorMessage = 'Oops! Unable to register. A user with the same email, username, or mobile number exists.';
          setTimeout(() => {
            this.errorMessage = null;
          }, 3500);
        }
      });

      this.subscriptions.add(registerSubscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
