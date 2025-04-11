import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Cart[] = [];

  addToCart(item: Cart): void {
    const existingItem = this.items.find(i => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeFromCart(productId: number): void {
    this.items = this.items.filter(item => item.productId !== productId);
  }

  clearCart(): void {
    this.items = [];
  }

  getItems(): Cart[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
}
