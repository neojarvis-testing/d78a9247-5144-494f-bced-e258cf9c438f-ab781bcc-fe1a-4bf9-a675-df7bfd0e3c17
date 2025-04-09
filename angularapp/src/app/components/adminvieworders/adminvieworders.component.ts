import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/order.service';

@Component({
  selector: 'app-adminvieworders',
  templateUrl: './adminvieworders.component.html',
  styleUrls: ['./adminvieworders.component.css']
})
export class AdminviewordersComponent implements OnInit {

  orders  : Order [] = [];   // for the getOrders

  order : Order = {   // for the getOrderDetails
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


  constructor(private orderService : OrdersService) { }


  ngOnInit(): void {
    this.getOrders();     // it will load the order list here 
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

  // 4. update the orderStatus by using id ans providing the new status 
  updateOrderStatus(id : number , newStatus : any){
    this.orderService.updateOrderStatus(id , newStatus).subscribe(data=>{
      this.getOrders();
    })
  }
  
}
