import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit, OnDestroy {
  feedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  feedbackToDelete: Feedback | null = null;
  userId: number = 0;
  user: User | null = null;
  
  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.userId = userId ? parseInt(userId, 10) : 0;

    this.getFeedbackByUserId();
  }

  getFeedbackByUserId(): void {
    const feedbackSubscription = this.feedbackService.getFeedbackByUserId(this.userId).subscribe(
      (data: Feedback[]) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error fetching feedback by user ID:', error);
      }
    );

    this.subscriptions.add(feedbackSubscription);
  }

  confirmDelete(feedback: Feedback): void {
    console.log('Delete button clicked');
    this.feedbackToDelete = feedback;
  }

  deleteFeedback(): void {
    if (this.feedbackToDelete) {
      const deleteSubscription = this.feedbackService.deleteFeedback(this.feedbackToDelete.feedbackId).subscribe(
        () => {
          this.feedbacks = this.feedbacks.filter(f => f.feedbackId !== this.feedbackToDelete!.feedbackId);
          this.feedbackToDelete = null;
        },
        (error) => {
          console.error('Error deleting feedback:', error);
        }
      );

      this.subscriptions.add(deleteSubscription);
    }
  }

  cancelDelete(): void {
    this.feedbackToDelete = null;
  }

  updateFeedback(feedback: Feedback): void {
    const updateSubscription = this.feedbackService.updateFeedback(feedback.feedbackId, feedback).subscribe(
      (updatedFeedback: Feedback) => {
        const index = this.feedbacks.findIndex(f => f.feedbackId === updatedFeedback.feedbackId);
        if (index !== -1) {
          this.feedbacks[index] = updatedFeedback;
        }
        this.selectedFeedback = null;
      },
      (error) => {
        console.error('Error updating feedback:', error);
      }
    );

    this.subscriptions.add(updateSubscription);
  }

  selectFeedback(feedback: Feedback): void {
    console.log('Edit button clicked:', feedback);
    this.selectedFeedback = { ...feedback };
  }

  clearSelection(): void {
    this.selectedFeedback = null;
  }

  // Cleanup subscriptions when component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
