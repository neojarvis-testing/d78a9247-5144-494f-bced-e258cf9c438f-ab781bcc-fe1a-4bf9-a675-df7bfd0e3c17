import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/models/cart-item.model'; // Import the CartItem interface


@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {
  products: any[] = [];
  cart: CartItem[] = [];
  totalProductCount: number = 0;
  userId: number = 0;
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  wishlist: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.loadProducts();
    this.loadCart();
    this.loadWishlist();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.map(product => {
        //console.log("Raw Base64 Image Data:", product.productImage);
        let imageData = product.productImage;
        // Ensure the image data is valid and doesn't already contain the prefix
        if (imageData && !imageData.startsWith('data:image')) {
          imageData = `data:image/jpeg;base64,${imageData}`;
        }
        return {
          ...product,
          decodedImage: imageData  // Store the final image source format
        };
      });
  
      this.filteredProducts = this.products; // Initialize filtered products
      this.categories = [...new Set(this.products.map(p => p.category))]; // Extract unique categories
    });
  }

  filterProducts(): void {
    if (this.selectedCategory === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === this.selectedCategory);
    }
  }

  loadCart(): void {
    this.cartService.getCart(this.userId).subscribe(
      (data) => {
        this.cart = Array.isArray(data) ? data : [];
        this.updateTotalCount();
      },
      (error) => console.error('Failed to load cart', error)
    );
  }

  addToCart(product: any): void {
    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      quantity: 1,
      productPrice: product.price,
      userId: this.userId
    };
    console.log('Adding to cart:', cartItem); // Debugging log

    this.cartService.addToCart(cartItem).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        this.loadCart(); // Ensure the cart is reloaded after adding an item
        this.router.navigate(['/userNavBar/cart']);
      },
      (error) => {
        console.error('Failed to add product to cart', error);
        alert(`Error: ${error.message}`); // Added error handling
      }
    );
  }

  increaseQuantity(product: any): void {
    const existingProduct = this.cart.find(item => item.productId === product.id);
    if (existingProduct) {
      this.cartService.addToCart({ ...existingProduct, quantity: existingProduct.quantity + 1 }).subscribe(
        () => this.loadCart(),
        (error) => console.error('Failed to increase quantity', error)
      );
    }
  }

  decreaseQuantity(product: any): void {
    const existingProduct = this.cart.find(item => item.productId === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      this.cartService.addToCart({ ...existingProduct, quantity: existingProduct.quantity - 1 }).subscribe(
        () => this.loadCart(),
        (error) => console.error('Failed to decrease quantity', error)
      );
    } else if (existingProduct && existingProduct.quantity === 1) {
      this.cartService.removeFromCart(existingProduct.id!).subscribe(
        () => this.loadCart(),
        (error) => console.error('Failed to remove product from cart', error)
      );
    }
  }

  updateTotalCount(): void {
    this.totalProductCount = this.cart.reduce((total, product) => total + product.quantity, 0);
  }

  isInCart(product: any): boolean {
    return this.cart.some(item => item.productId === product.id);
  }

  /** Wishlist Functionality */
  loadWishlist(): void {
    const savedWishlist = localStorage.getItem('wishlist');
    this.wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
  }

  addToWishlist(product: any): void {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.some((item: any) => item.id === product.id)) {
      wishlist.push({ id: product.id, name: product.name, productImage: product.productImage });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    this.loadWishlist(); // Reload the wishlist to reflect changes
  }

  isInWishlist(product: any): boolean {
    return this.wishlist.some(item => item.id === product.id);
  }
}
  
  

