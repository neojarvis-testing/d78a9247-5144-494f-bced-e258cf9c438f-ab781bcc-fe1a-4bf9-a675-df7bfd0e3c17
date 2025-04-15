package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Product;


@Service
public interface ProductService {
    Product addProduct(Product product);
    List <Product> getAllProducts();
    Product getProductByProductId(Long id);
    List<Product> getProductsByUserId(Long userId);
    List<Product> getProductsByCategory(String category);
    void deleteProduct(Long id);
    Product updateProduct(Long productId,Product product);    
}
