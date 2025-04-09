package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Product;

public interface ProductRepo extends JpaRepository<Product,Long> {
   List<Product> findByUserId(Long userId); // Custom query for userId
    List<Product> findByCategory(String category); // Custom query for category

}
