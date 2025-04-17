package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    
    Wishlist findByUserId(Long userId);
    
}
