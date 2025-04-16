import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  feedbackToDelete: Feedback | null = null;
  userId: number;
  user: User;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = parseInt(userId, 10);
    } else {
      console.error('User ID not found in local storage.');
    }

    this.getFeedbackByUserId();
  }

  getFeedbackByUserId(): void {
    this.feedbackService.getFeedbackByUserId(this.userId).subscribe(
      (data: Feedback[]) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error fetching feedback by user ID:', error);
      }
    );
  }

  confirmDelete(feedback: Feedback): void {
    console.log('Delete button clicked');
    this.feedbackToDelete = feedback;
  }

  deleteFeedback(): void {
    if (this.feedbackToDelete) {
      this.feedbackService.deleteFeedback(this.feedbackToDelete.feedbackId).subscribe(
        () => {
          this.feedbacks = this.feedbacks.filter(f => f.feedbackId !== this.feedbackToDelete!.feedbackId);
          this.feedbackToDelete = null;
        },
        (error) => {
          console.error('Error deleting feedback:', error);
        }
      );
    }
  }

  cancelDelete(): void {
    this.feedbackToDelete = null;
  }

  updateFeedback(feedback: Feedback): void {
    this.feedbackService.updateFeedback(feedback.feedbackId, feedback).subscribe(
      (updatedFeedback: Feedback) => {
        const index = this.feedbacks.findIndex(f => f.feedbackId == updatedFeedback.feedbackId);
        if (index != -1) {
          this.feedbacks[index] = updatedFeedback;
        }
        this.selectedFeedback = null;
      },
      (error) => {
        console.error('Error updating feedback:', error);
      }
    );
  }

  selectFeedback(feedback: Feedback): void {
    console.log('Edit button clicked:', feedback);
    this.selectedFeedback = { ...feedback };
  }

  clearSelection(): void {
    this.selectedFeedback = null;
  }

  ratingError: boolean = false;

checkRating() {
  if (this.selectedFeedback.rating > 5) {
    this.ratingError = true;
  } else {
    this.ratingError = false;
  }
}

  
}
