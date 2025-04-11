import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  showDeletePopup: boolean = false;
  selectedFeedbackId: number | null = null;
  showLogoutPopup: boolean = false;
  showProfilePopup: boolean = false;
  selectedUser: any = null;

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  public getAllFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe(data => {
      this.feedbacks = data;
    });
  }

  triggerDelete(feedbackId: number): void {
    console.log(feedbackId)
    this.selectedFeedbackId = feedbackId;
    this.showDeletePopup = true;
  }

  confirmDelete(): void {
    if (this.selectedFeedbackId !== null) {
      this.feedbackService.deleteFeedback(this.selectedFeedbackId).subscribe(
        response => {
          const index = this.feedbacks.findIndex(f => f.feedbackId === this.selectedFeedbackId);
          if (index !== -1) {
            this.feedbacks.splice(index, 1);
          }
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
}