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

    {
      orderId: 1,
      user: {
        userId: 1,
        email: "john.doe@example.com",
        password: "password123",
        username: "johndoe",
        mobileNumber: "1234567890",
        userRole: "customer"
      },
      product: [
        {
          productId: 101,
          name: "Laptop",
          description: "A high-performance laptop",
          price: 1200,
          stock: 10,
          category: "Electronics",
          photoImage: "laptop.jpg",
          createdAt: new Date("2025-01-01T10:00:00Z"),
          updatedAt: new Date("2025-01-02T10:00:00Z"),
          user: {
            userId: 1,
            email: "john.doe@example.com",
            username: "johndoe"
          }
        },
        {
          productId: 102,
          name: "Mouse",
          description: "A wireless mouse",
          price: 25,
          stock: 50,
          category: "Accessories",
          photoImage: "mouse.jpg",
          createdAt: new Date("2025-01-01T10:00:00Z"),
          updatedAt: new Date("2025-01-02T10:00:00Z"),
          user: {
            userId: 1,
            email: "john.doe@example.com",
            username: "johndoe"
          }
        }
      ],
      shippingAddress: "123 Main St, Anytown, USA",
      totalAmount: 1225,
      quantity: 2,
      status: "Shipped",
      createdAt: new Date("2025-04-01T10:00:00Z"),
      updatedAt: new Date("2025-04-02T12:00:00Z")
    },
    {
      orderId: 2,
      user: {
        userId: 2,
        email: "jane.smith@example.com",
        password: "password456",
        username: "janesmith",
        mobileNumber: "0987654321",
        userRole: "customer"
      },
      product: [
        {
          productId: 103,
          name: "Smartphone",
          description: "A latest model smartphone",
          price: 800,
          stock: 20,
          category: "Electronics",
          photoImage: "smartphone.jpg",
          createdAt: new Date("2025-02-01T10:00:00Z"),
          updatedAt: new Date("2025-02-02T10:00:00Z"),
          user: {
            userId: 2,
            email: "jane.smith@example.com",
            username: "janesmith"
          }
        }
      ],
      shippingAddress: "456 Elm St, Othertown, USA",
      totalAmount: 800,
      quantity: 1,
      status: "Processing",
      createdAt: new Date("2025-04-05T14:30:00Z"),
      updatedAt: new Date("2025-04-06T09:00:00Z")
    }
    
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
