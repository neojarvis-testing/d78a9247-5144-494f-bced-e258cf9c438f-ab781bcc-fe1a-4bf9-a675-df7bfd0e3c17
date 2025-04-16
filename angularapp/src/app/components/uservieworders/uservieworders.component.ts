import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-uservieworders',
  templateUrl: './uservieworders.component.html',
  styleUrls: ['./uservieworders.component.css']
})
export class UserviewordersComponent implements OnInit {

  // Updated to handle multiple orders
  orders: Order[] = [];
  userId: number;

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Retrieve userId from localStorage
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

  getOrdersByUserId(userId: number) {
    this.orderService.getOrderByUserId(userId).subscribe((data: Order[]) => {
      console.log("Raw data: ", data);
      this.orders = data; // Assign array to orders
      console.log("Orders array: ", JSON.stringify(this.orders));
    },
    error => {
      console.error("Error fetching orders: ", error);
    });
  }
}
