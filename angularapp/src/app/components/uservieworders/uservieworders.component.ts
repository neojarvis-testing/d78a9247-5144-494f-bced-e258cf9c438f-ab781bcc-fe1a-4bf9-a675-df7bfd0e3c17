import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-uservieworders',
  templateUrl: './uservieworders.component.html',
  styleUrls: ['./uservieworders.component.css']
})
export class UserviewordersComponent implements OnInit {

  
  orders : Order [] = [
    
  ];
  
  userId : number = 0;
  
  constructor(private orderService: OrderService, private route: ActivatedRoute) { }
  
ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['userId']; // Get userId from route parameters
      this.getOrderByUserId(userId);
      });
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
