
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/models/email.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  isSubmit: boolean = false;

  userId: number = 0;

  emailData: Email = {
    name: '',
    email: '',
    message: ''
  };

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
  }

  onSubmit(): void {
    const emailSubscription = this.emailService.sendEmail(this.emailData).subscribe({
      next: (response) => {
        console.log(this.emailData);
        alert(response);
        this.emailData = { name: '', email: '', message: '' };
      },
      error: (error) => {
        alert('Failed to send Email, please try again...');
        console.log(error);
      }
    });

    this.subscriptions.add(emailSubscription);
  }

  // Cleanup subscriptions when component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Ensures proper memory cleanup
  }
}



