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
    // Retrieve user ID from local storage
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
        
        // Ensure Product data exists in each Feedback object to avoid undefined errors
        this.feedbacks.forEach(feedback => {
          feedback.product = feedback.product;
          //|| { productId: 0, name: 'Unknown Product' }
        });
      },
      (error) => {
        console.error('Error fetching feedback by user ID:', error);
      }
    );
  }

  confirmDelete(feedback: Feedback): void {
    this.feedbackToDelete = feedback;
  }

  deleteFeedback(): void {
    if (this.feedbackToDelete) {
      this.feedbackService.deleteFeedback(this.feedbackToDelete.feedbackId).subscribe(
        () => {
          const index = this.feedbacks.findIndex(f => f.feedbackId == this.feedbackToDelete!.feedbackId);
          if (index !== -1) {
            this.feedbacks.splice(index, 1);
          }
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
      },
      (error) => {
        console.error('Error updating feedback:', error);
      }
    );
  }

  selectFeedback(feedback: Feedback): void {
    this.selectedFeedback = feedback;
  }

  clearSelection(): void {
    this.selectedFeedback = null;
  }
}
