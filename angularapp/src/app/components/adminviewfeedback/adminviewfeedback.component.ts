import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  products: Product[] = [];
  showDeletePopup: boolean = false;
  selectedFeedbackId: number | null = null;
  showLogoutPopup: boolean = false;
  showProfilePopup: boolean = false;
  selectedUser: any = null;

  constructor(
    private feedbackService: FeedbackService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllFeedbacks();
    this.getAllProducts();
  }

  public getAllFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe(data => {
      this.feedbacks = data;
      this.mapProductNames();
    });
  }

  public getAllProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.mapProductNames();
    });
  }

  private mapProductNames(): void {
    if (this.feedbacks.length > 0 && this.products.length > 0) {
      this.feedbacks.forEach(feedback => {
        if (feedback.product && feedback.product.productId) {
          const product = this.products.find(p => p.productId === feedback.product.productId);
          if (product) {
            feedback.product.name = product.name;
          } else {
            console.warn(`Product not found for feedback with productId: ${feedback.product.productId}`);
          }
        } else {
          console.warn('Product or productId is undefined for feedback:', feedback);
        }
      });
    } else {
      console.warn('Feedbacks or products array is empty.');
    }
  }

  triggerDelete(feedbackId: number): void {
    console.log(feedbackId);
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
