package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Product;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ProductRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    ProductRepo productRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    public Product addProduct(Product product, String base64Image) {
        product.setPhotoImage(base64Image); // Set image

        if (product.getUser() != null) { // Ensure user is provided in product request
            User user = userRepo.findById(product.getUser().getUserId())
                                .orElseThrow(() -> new IllegalArgumentException("User not found!"));

            if ("USER".equals(user.getUserRole())) {
                // Regular users must be mapped to the product
                product.setUser(user);
            }
            // If user is ADMIN, they can add the product freely (no need for mapping)
        }

        return productRepo.save(product);
    }

    
//        @Override
// public Product addProduct(Product product, String base64Image) {
//     User user = new User();
//     user.setUserId(product.getUser().getUserId()); // Assuming the userId is provided in the request
//     product.setUser(user); // Set the user in the product

//     product.setPhotoImage(base64Image); // Handle Base64 image
//     return productRepo.save(product); // Save the product
//     }

  

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public Product getProductByProductId(Long id){
        Optional<Product> product = productRepo.findById(id);
        return product.orElseThrow(() -> new RuntimeException("Product not found"));
    
    }
    @Override
    public List<Product> getProductsByUserId(Long userId) {
        return productRepo.findByUserId(userId);
    }
    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepo.findByCategory(category); // Find products by category
    }

    @Override
    public void deleteProduct(Long id) {
        if (productRepo.existsById(id)) {
            productRepo.deleteById(id); // Delete product by ID
        } else {
            throw new RuntimeException("Product not found with id: " + id);
        }
    }

    @Override
    public Product updateProduct(Long productId, Product product) {
        Product existingProduct = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        // Update the existing product's fields with the new data
    existingProduct.setName(product.getName());
    existingProduct.setCategory(product.getCategory());
    existingProduct.setPrice(product.getPrice());
    existingProduct.setDescription(product.getDescription());

    // Save and return the updated product
    return productRepo.save(existingProduct);


}   
}