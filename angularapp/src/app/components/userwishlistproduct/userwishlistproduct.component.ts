import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-userwishlistproduct',
  templateUrl: './userwishlistproduct.component.html',
  styleUrls: ['./userwishlistproduct.component.css']
})
export class UserwishlistproductComponent implements OnInit, OnDestroy {

  wishlistProductIds: number[] = [];
  cart: CartItem[] = [];
  wishlistItems: Product[] = []; // Store actual product details
  userId: number;
  totalProductCount: number = 0;
  
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private wishlistService: WishlistService, private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId')); // Retrieve user ID from local storage
    if (!this.userId) {
      console.error("Error: User ID is undefined or null.");
      return;
    }
    this.loadWishlist();
  }

  /** Fetch wishlist items from the backend */
  loadWishlist(): void {
    const wishlistSubscription = this.wishlistService.getWishlist(this.userId).subscribe((data: any) => {
      if (data?.productIds) {
        this.wishlistProductIds = [...new Set(data.productIds as number[])]; // Remove duplicates, enforce number type
        this.fetchProductDetails();
      }
    });

    this.subscriptions.add(wishlistSubscription);
}


  /** Fetch product details for each product in the wishlist */
  fetchProductDetails(): void {
    this.wishlistItems = []; // Reset product list
    this.wishlistProductIds.forEach(productId => {
      const productSubscription = this.productService.getProductById(productId).subscribe((product) => {
        if (product) {
          this.wishlistItems.push(product);
        }
      });
      this.subscriptions.add(productSubscription);
    });
  }

  
  
  /** Remove a product from the wishlist */
  removeFromWishlist(productId: number): void {
    const removeSubscription = this.wishlistService.removeFromWishlist(this.userId, productId).subscribe(() => {
      // Remove all occurrences of the product ID from the wishlist
      this.wishlistItems = this.wishlistItems.filter(item => item.productId !== productId);
      this.wishlistProductIds = this.wishlistProductIds.filter(id => id !== productId); // Ensure product IDs list is updated
    });

    this.subscriptions.add(removeSubscription);
}

  loadCart(): void {
    const cartSubscription = this.cartService.getCart(this.userId).subscribe(
      (data) => {
        this.cart = Array.isArray(data) ? data : [];
        this.updateTotalCount();
      },
      (error) => console.error('Failed to load cart', error)
    );

    this.subscriptions.add(cartSubscription);
  }
  /** Add product to cart */
  addToCart(product: any): void {
    const cartItem: CartItem = {
      productId: product.productId,
      productName: product.name,
      quantity: 1,
      productPrice: product.price,
      user: { userId: this.userId }
    };

    const addToCartSubscription = this.cartService.addToCart(cartItem).subscribe(
      () => {
        this.loadCart();
        this.router.navigate(['/userNavBar/cart']);
      },
      (error) => console.error('Failed to add product to cart', error)
    );

    this.subscriptions.add(addToCartSubscription);
  }

  increaseQuantity(product: any): void {
    const existingProduct = this.cart.find(item => item.productId === product.id);
    if (existingProduct) {
      const increaseSubscription = this.cartService.addToCart({ ...existingProduct, quantity: existingProduct.quantity + 1 }).subscribe(
        () => this.loadCart(),
        (error) => console.error('Failed to increase quantity', error)
      );

      this.subscriptions.add(increaseSubscription);
    }
  }

  decreaseQuantity(product: any): void {
    const existingProduct = this.cart.find(item => item.productId === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      const decreaseSubscription = this.cartService.addToCart({ ...existingProduct, quantity: existingProduct.quantity - 1 }).subscribe(
        () => this.loadCart(),
        (error) => console.error('Failed to decrease quantity', error)
      );

      this.subscriptions.add(decreaseSubscription);
    } else if (existingProduct && existingProduct.quantity === 1) {
      const removeSubscription = this.cartService.removeFromCart(existingProduct.id!).subscribe(
        () => this.loadCart(),
        (error) => console.error('Failed to remove product from cart', error)
      );

      this.subscriptions.add(removeSubscription);
    }
  }

  updateTotalCount(): void {
    this.totalProductCount = this.cart.reduce((total, product) => total + product.quantity, 0);
  }

  isInCart(product: any): boolean {
    return this.cart.some(item => item.productId === product.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribing to prevent memory leaks
  }
}
