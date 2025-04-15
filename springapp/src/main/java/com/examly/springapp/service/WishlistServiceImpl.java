package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Wishlist;
import com.examly.springapp.repository.WishlistRepository;

import java.util.List;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    public WishlistServiceImpl(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    @Override
    public Wishlist getWishlistByUserId(String userId) {
        return wishlistRepository.findByUserId(userId);
    }

    @Override
    public Wishlist addToWishlist(String userId, Long productId) {
        Wishlist wishlist = wishlistRepository.findByUserId(userId);
        if (wishlist == null) {
            wishlist = new Wishlist(userId, List.of(productId));
        } else {
            wishlist.getProductIds().add(productId);
        }
        return wishlistRepository.save(wishlist);
    }

    @Override
    public Wishlist removeFromWishlist(String userId, Long productId) {
        Wishlist wishlist = wishlistRepository.findByUserId(userId);
        if (wishlist != null) {
            wishlist.getProductIds().remove(productId);
            return wishlistRepository.save(wishlist);
        }
        return null;
    }
}

