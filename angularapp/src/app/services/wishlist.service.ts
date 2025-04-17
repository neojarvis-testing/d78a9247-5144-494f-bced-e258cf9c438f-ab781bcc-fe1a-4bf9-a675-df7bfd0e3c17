import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from '../resources/global';
import { Observable } from 'rxjs';
import { Wishlist } from '../models/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  public baseUrl : string = Global.apiUrl+"/wishlist";

  constructor(private httpClient : HttpClient) { }

  // Fetch wishlist items for a user
  getWishlist(userId: number): Observable<Wishlist[]> {
    return this.httpClient.get<Wishlist[]>(`${this.baseUrl}/${userId}`);
  }

  // Add a product to the wishlist
  addToWishlist(userId: number, productId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${userId}/add/${productId}`, {});
  }

  // Remove a product from the wishlist
  removeFromWishlist(userId: number, productId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${userId}/remove/${productId}`);
  }
}
