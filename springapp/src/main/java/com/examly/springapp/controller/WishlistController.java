package com.examly.springapp.controller;

import com.examly.springapp.service.WishlistService;
import com.examly.springapp.model.Wishlist;

import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAuthority('USER')")
    public Wishlist getWishlist(@PathVariable Long userId) {
        return wishlistService.getWishlistByUserId(userId);
    }

    @PostMapping("/{userId}/add/{productId}")
    @PreAuthorize("hasAuthority('USER')")
    public Wishlist addToWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        return wishlistService.addToWishlist(userId, productId);
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    @PreAuthorize("hasAuthority('USER')")
    public Wishlist removeFromWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        return wishlistService.removeFromWishlist(userId, productId);
    }
}

