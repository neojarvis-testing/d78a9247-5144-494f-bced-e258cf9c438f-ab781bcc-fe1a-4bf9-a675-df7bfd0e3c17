import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  otpForm: FormGroup;
  resetPasswordForm: FormGroup;
  showOtpSection = false;
  showNewPasswordSection = false;
  isRedirecting = false; // New variable for hiding forms during redirect
  message = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  sendOTP() {
    const email = this.forgotPasswordForm.get('email')?.value;
    this.authService.sendOtp(email).subscribe({
      next: () => {
        this.showOtpSection = true;
        this.message = 'OTP sent successfully. Check your email.';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to send OTP. Please try again.';
        this.message = '';
      }
    });
  }

  verifyOTP() {
    const email = this.forgotPasswordForm.get('email')?.value;
    const otp = this.otpForm.get('otp')?.value;

    this.authService.verifyOtp(email, otp).subscribe({
      next: (response) => {
        if (response.success) {
          this.showOtpSection = false;
          this.showNewPasswordSection = true;
          this.message = 'OTP verified successfully. You can now reset your password.';
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Invalid OTP. Please try again.';
          this.message = '';
        }
      },
      error: () => {
        this.errorMessage = 'Error verifying OTP. Please try again.';
        this.message = '';
      }
    });
  }

  updatePassword() {
    const { newPassword } = this.resetPasswordForm.value;
    const email = this.forgotPasswordForm.get('email')?.value;

    this.authService.updatePassword(email, newPassword).subscribe({
      next: (response) => {
        if (response && response.message) {
          this.message = response.message;
          this.errorMessage = '';

          // Hide forms and show the redirect message
          this.isRedirecting = true;
          this.showOtpSection = false;
          this.showNewPasswordSection = false;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.errorMessage = 'Unexpected response. Please try again.';
          this.message = '';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update password.';
        this.message = '';

        // Hide forms and show redirect message even in case of an error
        this.isRedirecting = true;
        this.showOtpSection = false;
        this.showNewPasswordSection = false;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }
    });
  }
}
