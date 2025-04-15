package com.examly.springapp.service;

import com.examly.springapp.model.Wishlist;

public interface WishlistService {

    Wishlist getWishlistByUserId(String userId);
    Wishlist addToWishlist(String userId, Long productId);
    Wishlist removeFromWishlist(String userId, Long productId);

}
