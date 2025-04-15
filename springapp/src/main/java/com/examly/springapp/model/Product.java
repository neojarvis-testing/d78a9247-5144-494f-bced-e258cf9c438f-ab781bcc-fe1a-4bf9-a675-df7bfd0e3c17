package com.examly.springapp.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Product {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long productId;
     // @JsonProperty("productName")
     private String name;
     private String description;
     private double price;
     private int stock;
     private String category;

     @Lob
     @Column(columnDefinition = "LONGTEXT")

     private String productImage;
     private LocalDateTime createdAt;
     private LocalDateTime updatedAt;
     @ManyToOne
     private User user;


}
