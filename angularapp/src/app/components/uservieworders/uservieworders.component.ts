import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-uservieworders',
  templateUrl: './uservieworders.component.html',
  styleUrls: ['./uservieworders.component.css']
})
export class UserviewordersComponent implements OnInit {

  
  order : Order = { 
    orderId : 0,
    user : {},
    product : [],
    shippingAddress: "",
    totalAmount: 0,
    quantity: 0,
    status: "",
    createdAt : new Date,
    updatedAt : new Date
  }
  
  userId : number;
  
  constructor(private orderService: OrderService) { }

  
ngOnInit(): void {
    // Retrieve userId from localStorage
  const storedUserId = localStorage.getItem('userId');
  
  // Ensure userId is parsed into a number, if stored as a string
  this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;

  if (this.userId) {
    // Fetch orders for the user
    this.getOrderByUserId(this.userId);
  } else {
    console.error('No userId found in localStorage');
  }


}

getOrderByUserId(userId : number){
  this.orderService.getOrderByUserId(userId).subscribe(data=>{
    this.order = data;
  })
}

getOrderDetails(orderId : number){
  this.orderService.getOrderDetails(orderId).subscribe(
    data => {
      this.order = data;
      console.log('Order details fetched successfully:', this.order);
    },
    error => {
      console.error('Error fetching order details:', error);
    }
  );
}

}
