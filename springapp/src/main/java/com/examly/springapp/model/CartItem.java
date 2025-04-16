package com.examly.springapp.model;

import java.io.Serializable;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

public class CartItem implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private String productName;

    private Double productPrice; // Ensure this matches the frontend

    private int quantity;

    private String productImage;

    @ManyToOne
    @JoinColumn(name = "user_id") // Ensure user_id is not nullable
    private User user;
}
