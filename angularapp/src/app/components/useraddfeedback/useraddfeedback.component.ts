import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedbackText: string = '';
  rating: number = 5; // Default rating value, adjust as needed
  popupMessage: string | null = null;
  userId: number;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = parseInt(userId, 10);
    } else {
      console.error('User ID not found in local storage.');
    }
  }

  submitFeedback(fm: NgForm): void {
    console.log('Submit button clicked');
    console.log('This is the user ID:', this.userId);
    console.log(fm.value);

    if (!this.feedbackText.trim()) {
      this.popupMessage = 'Feedback is required.';
      return;
    }

    const feedback: Feedback = {
      message: this.feedbackText,
      user: {
        userId: this.userId
      },
      rating: this.rating
    };

    this.feedbackService.createFeedback(feedback).subscribe(
      () => {
        this.popupMessage = 'Successfully Added!';
        this.feedbackText = '';
      },
      (error) => {
        console.error('Error submitting feedback:', error);
      }
    );
  }

  closePopup(): void {
    this.popupMessage = null;
  }
}