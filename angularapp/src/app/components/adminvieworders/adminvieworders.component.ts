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


  constructor(private orderService : OrderService) { }


  ngOnInit(): void {
    console.log(this.getOrders())
     this.getOrders();     // it will load the order list here 
     this.updateOrderStatus(this.order.orderId, this.order.status);

  }

  // 1. deleting order using the particular id
  deleteOrder(id : number){
    this.orderService.deleteOrder(id).subscribe(data=>{
      this.getOrders();   // it will refresh the order list here 
    })
  }

  // 2. getting particulr order details by orderId
  getOrderDetails(orderId : number){
    this.orderService.getOrderDetails(orderId).subscribe(data=>{
      this.order = data;
    })
  }

  // 3. get all orders 
  getOrders(){
    this.orderService.getOrders().subscribe(data=>{
      this.orders = data;
    })
  }

  // 4. update the order status
  updateOrderStatus(id : number , status : string){
    this.orderService.updateOrderStatus(id , status).subscribe(data=>{
      this.getOrders();
    })
  }
  
}
