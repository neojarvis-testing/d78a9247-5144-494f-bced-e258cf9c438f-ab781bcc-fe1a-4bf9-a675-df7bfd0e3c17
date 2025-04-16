package com.examly.springapp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Product;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ProductRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class ProductServiceImpl implements ProductService {
    
    private final ProductRepo productRepo;
    private final UserRepo userRepo;

    // Constructor Injection
    public ProductServiceImpl(ProductRepo productRepo, UserRepo userRepo) {
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    @Override
    public Product addProduct(Product product) {
        // Ensure the image is stored in Base64 format
        if (product.getProductImage() != null && !product.getProductImage().startsWith("data:image")) {
            product.setProductImage("data:image/jpeg;base64," + product.getProductImage());
        }

        if (product.getUser() != null) { // Ensure user is provided in the product request
            User user = userRepo.findById(product.getUser().getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found!"));

            if ("USER".equals(user.getUserRole())) {
                product.setUser(user);
            }
        }

        return productRepo.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public Product getProductByProductId(Long id) {
        Optional<Product> product = productRepo.findById(id);
        return product.orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public List<Product> getProductsByUserId(Long userId) {
        return productRepo.findByUserId(userId);
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }

    @Override
    public void deleteProduct(Long id) {
        if (productRepo.existsById(id)) {
            productRepo.deleteById(id);
        } else {
            throw new RuntimeException("Product not found with id: " + id);
        }
    }

    @Override
    public Product updateProduct(Long productId, Product product) {
        Product existingProduct = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        // Ensure the updated image maintains Base64 format
        if (product.getProductImage() != null && !product.getProductImage().startsWith("data:image")) {
            product.setProductImage("data:image/jpeg;base64," + product.getProductImage());
        }

        // Update the existing product details
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setProductImage(product.getProductImage()); // Assign updated image
        existingProduct.setUpdatedAt(LocalDateTime.now());

        return productRepo.save(existingProduct);
    }
}
