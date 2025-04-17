import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-userwishlistproduct',
  templateUrl: './userwishlistproduct.component.html',
  styleUrls: ['./userwishlistproduct.component.css']
})
export class UserwishlistproductComponent implements OnInit, OnDestroy {

  wishlist: any[] = [];
  userId: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private wishlistService: WishlistService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url.includes('/userwishlistproduct')) {
        this.loadWishlist(); // Ensure wishlist is fetched when navigating
      }
    });
  }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10); // Get user ID from localStorage
    this.loadWishlist();
  }

  /** Fetch wishlist items from the backend */
  loadWishlist(): void {
    const wishlistSubscription = this.wishlistService.getWishlist(this.userId).subscribe(
      (data) => {
        this.wishlist = data; // Directly update wishlist without local storage
      },
      (error) => console.error("Error fetching wishlist:", error)
    );

    this.subscriptions.add(wishlistSubscription);
  }

  /** Remove a product from the wishlist */
  removeFromWishlist(productId: number): void {
    const removeSubscription = this.wishlistService.removeFromWishlist(this.userId, productId).subscribe(
      () => {
        this.loadWishlist(); // Refresh wishlist from the backend
      },
      (error) => console.error("Error removing from wishlist:", error)
    );

    this.subscriptions.add(removeSubscription);
  }

  /** Add product to cart */
  addToCart(product: any): void {
    // Navigate to the cart page after selecting the product
    this.router.navigate(['/cart']);
  }

  /** Check if the wishlist is empty */
  isWishlistEmpty(): boolean {
    return this.wishlist.length === 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribing to prevent memory leaks
  }
}
