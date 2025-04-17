import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/models/cart-item.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit, OnDestroy {
  products: any[] = [];
  cart: CartItem[] = [];
  totalProductCount: number = 0;
  userId: number = 0;
  user: User | null = null;
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  wishlist: any[] = [];
  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);

    const userSubscription = this.userService.getProfileById(this.userId).subscribe(
      (data) => this.user = data,
      (error) => console.error('Error fetching user profile:', error)
    );
    this.subscriptions.add(userSubscription);

    this.loadProducts();
    // this.loadCart();
    // this.loadWishlist();
  }

  loadProducts(): void {
    const productSubscription = this.productService.getProducts().subscribe(
      (data) => {
        this.products = data.map(product => {
          let imageData = product.productImage;
          if (imageData && !imageData.startsWith('data:image')) {
            imageData = `data:image/jpeg;base64,${imageData}`;
          }
          return { ...product, decodedImage: imageData };
        });

        // Populate categories dropdown without duplicates
        this.categories = ['All', ...new Set(this.products.map(p => p.category))];

        // Initially, display all products
        this.filteredProducts = [...this.products];
      },
      (error) => console.error('Error fetching products:', error)
    );

    this.subscriptions.add(productSubscription);
  }

  // Filtering function triggered when a category is selected
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory || this.selectedCategory === 'All');
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

  /** Fetch Wishlist from Backend */
  loadWishlist(): void {
    const wishlistSubscription = this.wishlistService.getWishlist(this.userId).subscribe(
      (data) => {
        this.wishlist = data; // Directly update wishlist without local storage
      },
      (error) => console.error('Error fetching wishlist:', error)
    );

    this.subscriptions.add(wishlistSubscription);
  }

  /** Add Product to Wishlist */
  addToWishlist(product: any): void {
    if (!product.productId || !this.userId) {
      console.error("Error: Product ID or User ID is undefined", { product, userId: this.userId });
      return;
    }

    const addWishlistSubscription = this.wishlistService.addToWishlist(this.userId, product.productId).subscribe(
      () => {
        this.loadWishlist(); // Refresh wishlist after successful addition
      },
      (error) => console.error("Error adding to wishlist:", error)
    );

    this.subscriptions.add(addWishlistSubscription);
  }

  /** Remove Product from Wishlist */
  removeFromWishlist(productId: number): void {
    const removeWishlistSubscription = this.wishlistService.removeFromWishlist(this.userId, productId).subscribe(
      () => {
        this.loadWishlist(); // Refresh wishlist after successful removal
      },
      (error) => console.error("Error removing from wishlist:", error)
    );

    this.subscriptions.add(removeWishlistSubscription);
  }

  /** Check if Product is in Wishlist */
  isInWishlist(product: any): boolean {
    return this.wishlist.some(item => item.id === product.id);
  }

  // Cleanup subscriptions when component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
