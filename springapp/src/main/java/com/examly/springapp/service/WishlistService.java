package com.examly.springapp.service;

import com.examly.springapp.model.Wishlist;

public interface WishlistService {

    Wishlist getWishlistByUserId(Long userId);
    Wishlist addToWishlist(Long userId, Long productId);
    Wishlist removeFromWishlist(Long userId, Long productId);

}
