package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderStatus;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.OrderRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepo orderRepo;
    private final UserRepo userRepo;

    // Constructor Injection
    public OrderServiceImpl(OrderRepo orderRepo, UserRepo userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    @Override
    public Order addOrder(Order order) {
        return orderRepo.save(order); // Save the order to the database
    }

    @Override
    public void deleteOrder(Long orderId) {
        if (orderRepo.existsById(orderId)) {
            orderRepo.deleteById(orderId); // Delete the order by its ID
        } else {
            throw new IllegalArgumentException("Order not found.");
        }
    }

    
    @Override
    public Order getOrderById(Long orderId) {
     Optional<Order> order = orderRepo.findById(orderId); // Find the order by its ID
        if (order.isPresent()) {
        return order.get();
     } else {
        throw new IllegalArgumentException("Order not found for ID: " + orderId);
        }
    }


    @Override
    public List<Order> getOrdersByUser(int userId) {
        Optional<User> user = userRepo.findById((long) userId); // Retrieve the user by ID
        if (user.isPresent()) {
            return orderRepo.findByUser(user.get()); // Fetch orders for the found user
        } else {
            throw new IllegalArgumentException("User not found.");
        }
    }

    @Override
    public List<Order> getOrdersByStatus(OrderStatus status) {
        return orderRepo.findByStatus(status); // Retrieve orders filtered by their status
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepo.findAll(); // Retrieve all orders
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        Optional<User> user = userRepo.findById(userId); // Retrieve the user by ID
        if (user.isPresent()) {
            return orderRepo.findByUser(user.get()); // Fetch orders for the found user
        } else {
            throw new IllegalArgumentException("User not found.");
        }
    }

    
    @Override
    public Order updateOrder(Long id, Order orderDetails) {
        orderDetails.setOrderId(id);
        Optional<Order> opt = orderRepo.findById(id);
        if (opt.isEmpty()) {
            throw new EntityNotFoundException("Order with ID " + id + " not found!");
        }
 
        Order existingOrders = opt.get();
        existingOrders.setStatus((orderDetails.getStatus()));
 
        return orderRepo.save(existingOrders);
 
    }
    
    
}
