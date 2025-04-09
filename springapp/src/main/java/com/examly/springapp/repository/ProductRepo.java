package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Product;

public interface ProductRepo extends JpaRepository<Product,Long> {

    @Query("select p from Product p where p.user.userId = :userId")
    List<Product> findByUserId(Long userId); // Custom query for userId
    List<Product> findByCategory(String category); // Custom query for category

}
