package com.examly.springapp.controller;

import com.examly.springapp.model.CartItem;
import com.examly.springapp.model.User;
import com.examly.springapp.service.CartService;
import com.examly.springapp.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class CartController {

    private final CartService cartService;
    private final UserService userService;

    // Constructor injection
    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
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
