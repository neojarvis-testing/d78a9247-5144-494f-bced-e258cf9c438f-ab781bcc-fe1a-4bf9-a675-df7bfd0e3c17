import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Order } from 'src/app/models/order.model';
import { CartItem } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-useraddcart',
  templateUrl: './useraddcart.component.html',
  styleUrls: ['./useraddcart.component.css']
})
export class UseraddcartComponent implements OnInit, OnDestroy {
  cart: CartItem[] = [];
  shippingAddress: string = '';
  orderPlaced: boolean = false;
  addressError: boolean = false;
  userId: number = 0;
  isAuthenticated: boolean = false;

  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(
    private ordersService: OrderService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      alert('User not logged in. Redirecting to login page...');
      this.router.navigate(['/login']);
    } else {
      this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
      this.loadCart();
    }
  }

  loadCart(): void {
    const cartSubscription = this.cartService.getCart(this.userId).subscribe(
      (data: CartItem[]) => {
        this.cart = data;
        console.log('Loaded cart:', this.cart);
      },
      (error) => console.error('Failed to load cart', error)
    );

    this.subscriptions.add(cartSubscription);
  }

  increaseQuantity(item: CartItem): void {
    item.quantity += 1;
    const increaseSubscription = this.cartService.addToCart(item).subscribe(
      () => this.loadCart(),
      (error) => console.error('Failed to increase quantity', error)
    );

    this.subscriptions.add(increaseSubscription);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      const decreaseSubscription = this.cartService.addToCart(item).subscribe(
        () => this.loadCart(),
        (error) => console.error('Failed to decrease quantity', error)
      );

      this.subscriptions.add(decreaseSubscription);
    }
  }

  removeFromCart(product: CartItem): void {
    const removeSubscription = this.cartService.removeFromCart(product.id!).subscribe(
      () => this.loadCart(),
      (error) => console.error('Failed to remove item from cart', error)
    );

    this.subscriptions.add(removeSubscription);
  }

  calculateTotal(price: number, quantity: number): number {
    const gst = price * 0.12;
    const deliveryCharge = price * 0.03;
    return (price + gst + deliveryCharge) * quantity;
  }

  getSubtotal(): number {
    return this.cart.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
  }

  getGST(): number {
    return this.cart.reduce((total, item) => total + (item.productPrice * 0.12 * item.quantity), 0);
  }

  getDeliveryCharge(): number {
    return this.cart.reduce((total, item) => total + (item.productPrice * 0.03 * item.quantity), 0);
  }

  getGrandTotal(): number {
    return this.getSubtotal() + this.getGST() + this.getDeliveryCharge();
  }

  placeOrder(): void {
    if (!this.shippingAddress.trim()) {
      this.addressError = true;
      return;
    }
    this.addressError = false;

    const username = this.authService.getUsername();
    if (!username) {
      alert('User not logged in. Redirecting to login page...');
      this.router.navigate(['/login']);
      return;
    }

    const order: Order = {
      product: this.cart,
      user: { userId: this.userId },
      shippingAddress: this.shippingAddress,
      totalAmount: this.getGrandTotal(),
      quantity: this.cart.reduce((total, item) => total + item.quantity, 0),
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const orderSubscription = this.ordersService.placeOrder(order).subscribe(
      () => {
        this.orderPlaced = true;
        const clearCartSubscription = this.cartService.clearCart(this.userId).subscribe(
          () => {
            this.loadCart();
            this.router.navigate(['/userNavBar/uservieworders']);
          },
          (error) => console.error('Failed to clear cart', error)
        );

        this.subscriptions.add(clearCartSubscription);
      },
      (error) => console.error('Failed to place order', error)
    );

    this.subscriptions.add(orderSubscription);
  }

  // Cleanup subscriptions when component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
