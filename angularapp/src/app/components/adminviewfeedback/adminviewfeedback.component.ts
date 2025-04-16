import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit, OnDestroy {

  feedbacks: Feedback[] = [];
  products: Product[] = [];
  showDeletePopup: boolean = false;
  selectedFeedbackId: number | null = null;
  showLogoutPopup: boolean = false;
  showProfilePopup: boolean = false;
  selectedUser: any = null;

  private feedbackSubscription!: Subscription; // Property to store subscription

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  private getAllFeedbacks(): void {
    this.feedbackSubscription = this.feedbackService.getAllFeedback().subscribe(feedbackData => {
      this.feedbacks = feedbackData;
    }, error => {
      console.error('Error fetching feedbacks:', error);
    });
  }

  triggerDelete(feedbackId: number): void {
    this.selectedFeedbackId = feedbackId;
    this.showDeletePopup = true;
  }

  confirmDelete(): void {
    if (this.selectedFeedbackId !== null) {
      this.feedbackSubscription = this.feedbackService.deleteFeedback(this.selectedFeedbackId).subscribe(
        () => {
          this.feedbacks = this.feedbacks.filter(f => f.feedbackId !== this.selectedFeedbackId);
          this.closeDeletePopup();
        },
        error => {
          console.error('Error deleting feedback:', error);
        }
      );
    }
  }

  closeDeletePopup(): void {
    this.showDeletePopup = false;
    this.selectedFeedbackId = null;
  }

  triggerLogout(): void {
    this.showLogoutPopup = true;
  }

  confirmLogout(): void {
    this.authService.logout();
    this.showLogoutPopup = false;
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.showLogoutPopup = false;
  }

  showProfile(user: any): void {
    this.selectedUser = user;
    this.showProfilePopup = true;
  }

  closeProfilePopup(): void {
    this.showProfilePopup = false;
    this.selectedUser = null;
  }

  // Cleanup the subscription when component is destroyed
  ngOnDestroy(): void {
    if (this.feedbackSubscription) {
      this.feedbackSubscription.unsubscribe();
    }
  }
}
