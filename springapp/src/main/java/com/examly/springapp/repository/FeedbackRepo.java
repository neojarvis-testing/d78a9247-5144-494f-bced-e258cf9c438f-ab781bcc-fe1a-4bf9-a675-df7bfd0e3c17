package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Feedback;

public interface FeedbackRepo extends JpaRepository<Feedback,Long>{
    @Query("select f from Feedback f where f.user.userId = :userId")
    List<Feedback> findByUserId(Long userId);   

    // @Query("select f from Feedback f where f.product.productName LIKE:productName")
    

    
    @Query("select f from Feedback f join fetch f.product where f.product.name = :productName")
    List<Feedback> findByProductName(String productName);

}
