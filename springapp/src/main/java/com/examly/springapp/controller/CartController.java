package com.examly.springapp.controller;

import com.examly.springapp.model.CartItem;
import com.examly.springapp.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    // Constructor injection
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCartItems(@PathVariable Long userId) {
        return cartService.getCartItems(userId);
    }

    @PostMapping
    public CartItem addCartItem(@RequestBody CartItem cartItem) {
        
        //  User user = userService.getById(cartItem.getUser().getUserId()).get();
        //  cartItem.setUser(user);
         return cartService.addCartItem(cartItem);
 
    }

    @DeleteMapping("/{id}")
    public void removeCartItem(@PathVariable Long id) {
        cartService.removeCartItem(id);
    }

    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
    }
}
