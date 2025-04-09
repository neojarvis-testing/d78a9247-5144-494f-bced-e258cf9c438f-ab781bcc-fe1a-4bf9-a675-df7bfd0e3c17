package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Product;
import com.examly.springapp.repository.ProductRepo;

@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    ProductRepo productRepo;

    @Override
    public Product addProduct(Product product, String base64Image) {
        // Add logic to handle Base64 image, e.g., decoding and saving the image
        product.setPhotoImage(base64Image); // Assuming the product has an 'image' field
        return productRepo.save(product);
    }

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