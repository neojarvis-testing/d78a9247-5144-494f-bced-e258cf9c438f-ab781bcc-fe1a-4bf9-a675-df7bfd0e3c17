import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-uservieworders',
  templateUrl: './uservieworders.component.html',
  styleUrls: ['./uservieworders.component.css']
})
export class UserviewordersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  userId: number = 0;
  private subscriptions: Subscription = new Subscription(); // Manage multiple subscriptions

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    console.log("Getting ID from local storage: " + storedUserId);

    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
    console.log("Setting it to this.userId: " + this.userId);

    if (this.userId) {
      this.getOrdersByUserId(this.userId);
      this.cdr.detectChanges();
    } else {
      console.error('No userId found in localStorage');
    }
  }

  getOrdersByUserId(userId: number): void {
    const orderSubscription = this.orderService.getOrderByUserId(userId).subscribe(
      (data: Order[]) => {
        console.log("Raw data: ", data);
        this.orders = data;
        console.log("Orders array: ", JSON.stringify(this.orders));
      },
      (error) => {
        console.error("Error fetching orders: ", error);
      }
    );

    this.subscriptions.add(orderSubscription);
  }

  // Cleanup subscriptions when component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
