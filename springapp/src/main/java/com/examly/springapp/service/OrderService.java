package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderStatus; 

public interface OrderService {
       

    Order addOrder(Order order);


    void deleteOrder(Long orderId);


    Order getOrderById(Long orderId);

 
    List<Order> getOrdersByUser(int userId);


    List<Order> getOrdersByStatus(OrderStatus status);


    List<Order> getAllOrders();

   
    List<Order> getOrdersByUserId(Long userId);
    
} 
