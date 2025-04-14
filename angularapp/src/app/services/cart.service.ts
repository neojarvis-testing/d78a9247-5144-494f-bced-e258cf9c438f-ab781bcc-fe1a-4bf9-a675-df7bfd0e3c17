import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = [];

  constructor() {}

  getCart(): any[] {
    return this.cart;
  }

  addToCart(product: any): void {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (!existingProduct) {
      this.cart.push({ ...product, quantity: 1 });
    } else {
      existingProduct.quantity += 1;
    }
    
  }

  removeFromCart(product: any): void {
    this.cart = this.cart.filter(item => item.id !== product.id);
  }

  clearCart(): void {
    this.cart = [];
  }
}
