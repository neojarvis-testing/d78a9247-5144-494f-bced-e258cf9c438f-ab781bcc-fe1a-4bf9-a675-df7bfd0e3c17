import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordsMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  public onSubmit(){
    if (this.forgotPasswordForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { email, newPassword } = this.forgotPasswordForm.value;

    this.authService.updatePassword(email, newPassword)
      .subscribe({
        next: () => {
          this.message = 'Password has been updated successfully.';
          this.errorMessage = '';
          this.forgotPasswordForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Cannot find user by email';
          setTimeout(() =>{
            this.errorMessage = '';
            this.forgotPasswordForm.reset()
          }, 3500)
        }
      });
  }
}
