package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private String productName;

    private Double productPrice; // Ensure this matches the frontend

    private int quantity;

    private String productImage;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Ensure user_id is not nullable
    private User user;
}
