import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/models/email.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isLoggedIn: boolean = false;
  isSubmit: boolean = false;
  userId : number = 0;
  
  emailData: Email = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
  }

  onSubmit(): void {
    this.emailService.sendEmail(this.emailData).subscribe({
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
  }

}

