import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-adminvieworders',
  templateUrl: './adminvieworders.component.html',
  styleUrls: ['./adminvieworders.component.css']
})
export class AdminviewordersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  userName: string = "";
  private subscriptions: Subscription = new Subscription(); // Manage subscriptions

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const storedUserName = localStorage.getItem('username');
    this.userName = storedUserName ?? "";
    
    this.getOrders();
  }

  // Fetch all orders
  getOrders(): void {
    const orderSubscription = this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
    this.subscriptions.add(orderSubscription);
  }

  // Delete order by ID
  deleteOrder(id: number): void {
    const deleteSubscription = this.orderService.deleteOrder(id).subscribe(() => {
      this.getOrders(); // Refresh order list
    });
    this.subscriptions.add(deleteSubscription);
  }

  // Update order status
  updateOrderStatus(orderId: number, newStatus: string): void {
    const order = this.orders.find(order => order.orderId === orderId);
    console.log(order);

    if (order) {
      order.status = newStatus;
      const updateSubscription = this.orderService.updateOrder(orderId, order).subscribe(data => {
        console.log(data);
        console.log("Order status updated successfully!");
      });
      this.subscriptions.add(updateSubscription);

      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } else {
      console.error(`Order with id ${orderId} not found.`);
    }
  }

  // Cleanup subscriptions when component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
