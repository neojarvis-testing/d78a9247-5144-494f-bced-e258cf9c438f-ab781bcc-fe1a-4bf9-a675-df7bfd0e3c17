import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/order.service';

@Component({
  selector: 'app-uservieworders',
  templateUrl: './uservieworders.component.html',
  styleUrls: ['./uservieworders.component.css']
})
export class UserviewordersComponent implements OnInit {

  constructor(private orderService : OrdersService) { }

  orders : Order [] = [];
  userId : number = 0 ;  // dummy use only 

  ngOnInit(): void {
    this.getOrderByUserId(this.userId);
  }

  createOrder(order : Order){
    this.orderService.placeOrder(order).subscribe(data=>{

    })
  }

  getOrderByUserId(userId : number){
    this.orderService.getOrderByUserId(userId).subscribe(data=>{
      this.orders = data;
    })
  }

}
