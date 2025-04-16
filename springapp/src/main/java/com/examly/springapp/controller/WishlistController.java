package com.examly.springapp.controller;

import com.examly.springapp.service.WishlistService;
import com.examly.springapp.model.Wishlist;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    // Constructor injection
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }


    @GetMapping("/{userId}")
    public Wishlist getWishlist(@PathVariable String userId) {
        return wishlistService.getWishlistByUserId(userId);
    }

    @PostMapping("/{userId}/add/{productId}")
    public Wishlist addToWishlist(@PathVariable String userId, @PathVariable Long productId) {
        return wishlistService.addToWishlist(userId, productId);
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public Wishlist removeFromWishlist(@PathVariable String userId, @PathVariable Long productId) {
        return wishlistService.removeFromWishlist(userId, productId);
    }
}

