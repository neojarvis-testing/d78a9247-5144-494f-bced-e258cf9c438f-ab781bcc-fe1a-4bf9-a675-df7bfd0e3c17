package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderStatus;
import com.examly.springapp.model.User;

public interface OrderRepo extends JpaRepository<Order,Long> {
    List<Order> findByUser(User user);
    List<Order> findByStatus(OrderStatus status);
    
}
