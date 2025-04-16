import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { Product } from 'src/app/models/product.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  selectedProduct: Product | null = null;
  feedbackText: string = '';
  rating: number = 5; // Default rating value, adjust as needed
  popupMessage: string | null = null;
  userId: number = 0;
  productId: number = 0;

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(private feedbackService: FeedbackService, private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.userId = userId ? parseInt(userId, 10) : 0;

    const productSubscription = this.productService.getProducts().subscribe(
      (data) => this.products = data,
      (error) => console.error('Error fetching products:', error)
    );

    // Extract productId from route parameters
    this.productId = parseInt(this.route.snapshot.paramMap.get('productid'), 10);
    console.log("Navigated product ID:", this.productId);

    // Fetch the selected product based on productId
    this.productService.getProductById(this.productId).subscribe(
      (product) => this.selectedProduct = product,
      (error) => console.error("Error fetching product:", error)
    );

    this.subscriptions.add(productSubscription);
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
      user: { userId: this.userId },
      rating: this.rating,
      product: this.selectedProduct // Include the selected product
    };

    const feedbackSubscription = this.feedbackService.createFeedback(feedback).subscribe({
      next: () => {
        this.popupMessage = 'Successfully Added!';
        this.feedbackText = '';
        this.router.navigate(['/userNavBar/userviewfeedback']);
      },
      error: (error) => {
        console.error('Error submitting feedback:', error);
      }
    });

    this.subscriptions.add(feedbackSubscription);
    
  }

  closePopup(): void {
    this.popupMessage = null;
  }

  // Cleanup subscriptions when component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
