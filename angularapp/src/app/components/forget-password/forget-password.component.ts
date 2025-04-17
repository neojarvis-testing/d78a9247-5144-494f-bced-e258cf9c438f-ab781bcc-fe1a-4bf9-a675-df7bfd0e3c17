import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup;
  otpForm: FormGroup;
  resetPasswordForm: FormGroup;
  showOtpSection = false;
  showNewPasswordSection = false;
  isRedirecting = false; // New variable for hiding forms during redirect
  message = '';
  errorMessage = '';

  private subscriptions: Subscription = new Subscription(); // Manage subscriptions

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

  sendOTP(): void {
    const email = this.forgotPasswordForm.get('email')?.value;
    const otpSubscription = this.authService.sendOtp(email).subscribe({
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

    this.subscriptions.add(otpSubscription);
  }

  verifyOTP(): void {
    const email = this.forgotPasswordForm.get('email')?.value;
    const otp = this.otpForm.get('otp')?.value;

    const verifySubscription = this.authService.verifyOtp(email, otp).subscribe({
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

    this.subscriptions.add(verifySubscription);
  }

  updatePassword(): void {
    const { newPassword } = this.resetPasswordForm.value;
    const email = this.forgotPasswordForm.get('email')?.value;

    const updateSubscription = this.authService.updatePassword(email, newPassword).subscribe({
      next: (response) => {
        if (response && response.message) {
          this.message = response.message;
          this.errorMessage = '';

          
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

       
        this.isRedirecting = true;
        this.showOtpSection = false;
        this.showNewPasswordSection = false;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }
    });

    this.subscriptions.add(updateSubscription);
  }

  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); 
  }
}
