package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Product;
import com.examly.springapp.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add a new product (POST, ADMIN)
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> addProduct(@RequestBody Product product,String base64Image) {
        Product createdProduct = productService.addProduct(product,base64Image);
        return ResponseEntity.status(201).body(createdProduct);
    }

    // Update an existing product by ID (PUT, ADMIN)
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.status(200).body(updatedProduct);
    }

    // View product by ID (GET, ADMIN or USER)
    @GetMapping("/{id}")
    
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Product product = productService.getProductByProductId(id);
        return ResponseEntity.status(200).body(product);
    }
    // Delete a product by ID (DELETE, ADMIN)
    @DeleteMapping("/{id}")
  
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.status(200).body("");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    // Get products by category (GET, ADMIN and USER)
    @GetMapping("/category/{category}")
   
    public ResponseEntity<?> getProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.getProductsByCategory(category);
        if (products.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(products);
    }

    // View all products (GET, ADMIN and USER)
    @GetMapping
    
    public ResponseEntity<?> viewAllProducts() {
        List<Product> products = productService.getAllProducts();
        if (products.isEmpty()) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).body(products);
    }

    // Get products by User ID (GET, ADMIN, USER)
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> getProductsByUserId(@PathVariable Long userId) {
        List<Product> products = productService.getProductsByUserId(userId);
        if (products.isEmpty()) {
            return ResponseEntity.status(404).build(); // No products found
        }
        return ResponseEntity.status(200).body(products); // Return list of products
    }

}
