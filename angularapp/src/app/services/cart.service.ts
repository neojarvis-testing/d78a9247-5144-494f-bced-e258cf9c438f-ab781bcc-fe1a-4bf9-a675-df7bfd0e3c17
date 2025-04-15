import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from '../resources/global';
import { CartItem } from '../models/cart-item.model'; // Import the CartItem interface

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl: string = Global.apiUrl + '/api/cart';

  constructor(private http: HttpClient) {}

  getCart(userId: number) {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`);
  }

  addToCart(item: CartItem) {
    return this.http.post<CartItem>(this.apiUrl, item); // Ensure this method is correctly implemented
  }

  removeFromCart(itemId: number) {
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }

  clearCart(userId: number) {
    return this.http.delete(`${this.apiUrl}/clear/${userId}`);
  }
}
