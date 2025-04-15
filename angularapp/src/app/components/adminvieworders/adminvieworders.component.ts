import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-adminvieworders',
  templateUrl: './adminvieworders.component.html',
  styleUrls: ['./adminvieworders.component.css']
})
export class AdminviewordersComponent implements OnInit {

  orders  : Order [] = [];

  userName : string = "";
  


  constructor(private orderService : OrderService) { }


  ngOnInit(): void {

    const storedUserName = localStorage.getItem('username');
    this.userName = storedUserName;
     this.getOrders();

  }

  // 1. deleting order using the particular id
  deleteOrder(id : number){
    this.orderService.deleteOrder(id).subscribe(data=>{
      this.getOrders();   // it will refresh the order list here 
    })
  }

  

  // 3. get all orders 
  getOrders(){
    this.orderService.getOrders().subscribe(data=>{
      this.orders = data;
    })
  }

  // 4. update the order status
  updateOrderStatus(orderId: number, newStatus: string) {
    // Find the order by id
    const order = this.orders.find(order => order.orderId === orderId);
    console.log(order);
    // Check if the order exists
    if (order) {
      order.status = newStatus;
      this.orderService.updateOrder(orderId, order).subscribe(data => {
        console.log(data);
        console.log("hiiiii")
      })
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } else {
      console.error(`Order with id ${orderId} not found.`);
    }
  }
  
}
