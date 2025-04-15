import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { Global } from '../resources/global';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  
  // Replace the url with original one with the endpoint
  private apiUrl = Global.apiUrl + "/api/orders"; 
  
  constructor(private http: HttpClient) {}

  // Creates a new order
  placeOrder(order: Order): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  // Deletes an order by its ID
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+"/"+id);
  }

  // Fetches details of a specific order by ID
  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get(this.apiUrl+"/"+orderId);
  }

  // Retrieves orders for a specific user by user ID
  getOrderByUserId(userId: number): Observable<any> {
    return this.http.get(this.apiUrl+"/"+userId);
  }

  // Fetches all orders
  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Updates the status of a specific order by ID
  updateOrderStatus(id: number, newStatus: string): Observable<any> {
    return this.http.patch(this.apiUrl+"/"+id, newStatus);
  }
}
