package com.examly.springapp.repository;

import com.examly.springapp.model.CartItem;
import com.examly.springapp.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    List<CartItem> findByUser(User user);

    @Query("SELECT c FROM CartItem c WHERE c.user.userId = :userId")
    List<CartItem> findByUserId(@Param("userId") Long userId);
}

