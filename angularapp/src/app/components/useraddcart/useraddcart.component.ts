import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-useraddcart',
  templateUrl: './useraddcart.component.html',
  styleUrls: ['./useraddcart.component.css']
})
export class UseraddcartComponent implements OnInit {

  cart: any[] = [];
  shippingAddress: string = '';
  orderPlaced: boolean = false;
  addressError: boolean = false;

  constructor(
    private ordersService: OrderService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = this.cartService.getCart();
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  increaseQuantity(item: any): void {
    item.quantity += 1;
  }

  removeFromCart(product: any): void {
    this.cartService.removeFromCart(product);
    this.loadCart();
  }

  calculateTotal(price: number, quantity: number): number {
    const gst = price * 0.12;
    const deliveryCharge = price * 0.03;
    return (price + gst + deliveryCharge) * quantity;
  }

  getSubtotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getGST(): number {
    return this.cart.reduce((total, item) => total + (item.price * 0.12 * item.quantity), 0);
  }

  getDeliveryCharge(): number {
    return this.cart.reduce((total, item) => total + (item.price * 0.03 * item.quantity), 0);
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
      alert('User not logged in');
      return;
    }

    const order: Order = {
      user: { username }, 
      product: this.cart,
      shippingAddress: this.shippingAddress,
      totalAmount: this.getGrandTotal(),
      quantity: this.cart.reduce((total, item) => total + item.quantity, 0),
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.ordersService.placeOrder(order).subscribe(() => {
      this.orderPlaced = true;
      this.cartService.clearCart();
      this.loadCart();
      this.router.navigate(['/uservieworders']);
    });
  }
}
