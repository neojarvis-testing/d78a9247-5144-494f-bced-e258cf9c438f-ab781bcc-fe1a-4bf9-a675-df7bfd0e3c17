package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.Product;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.ProductRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FeedbackServiceImpl implements FeedbackService{

    private final FeedbackRepo feedbackRepo;
    private final UserRepo userRepo;
    private final ProductRepo productRepo;

    // Constructor Injection
    public FeedbackServiceImpl(FeedbackRepo feedbackRepo, UserRepo userRepo, ProductRepo productRepo) {
        this.feedbackRepo = feedbackRepo;
        this.userRepo = userRepo;
        this.productRepo = productRepo;
    }

    @Override
    public Feedback createFeedback(Feedback feedback) {
        User user = userRepo.findById(feedback.getUser().getUserId())
                            .orElseThrow(() -> new RuntimeException("User not found"));
        feedback.setUser(user); 
        
        Product product = productRepo.findById(feedback.getProduct().getProductId())
                            .orElseThrow(() -> new RuntimeException("Product not found"));
        feedback.setProduct(product);

            
        return feedbackRepo.save(feedback);
    }
    

    @Override
    public Feedback getFeedbackById(Long feedbackId) {
        Optional<Feedback> feedback = feedbackRepo.findById(feedbackId);
        if(feedback.isEmpty()){
            throw new EntityNotFoundException("Feedback ID not found");
        }
        return feedback.get();      
    }

    @Override
    public List<Feedback> getAllFeedback() {
        List<Feedback> feedbackList = feedbackRepo.findAll();
        for (Feedback feedback : feedbackList) {
            Product product = productRepo.findById(feedback.getProduct().getProductId()).orElse(null);
            feedback.setProduct(product);
        }
        return feedbackList;
        
                
    }

    @Override
    public Feedback deleteFeedback(Long feedbackId) {
        Optional<Feedback> feedback = feedbackRepo.findById(feedbackId);
        if(feedback.isPresent()){
            feedbackRepo.deleteById(feedbackId);
            return feedback.get();
        }
        throw new EntityNotFoundException("Feedback ID is not found.");
    }

    @Override
    public List<Feedback> getFeedbackByUserId(Long userId) {
        List<Feedback> feedbacklist = feedbackRepo.findByUserId(userId);
        if(feedbacklist.isEmpty()){
            throw new EntityNotFoundException("User ID is not found.");

        }
        for (Feedback feedback : feedbacklist) {
            Product product = productRepo.findById(feedback.getProduct().getProductId()).orElse(null);
            feedback.setProduct(product);
        }
        return feedbacklist;
    }

    @Override
    public Feedback updateFeedback(Long feedbackId, Feedback feedback) {
        Feedback existingFeedback = feedbackRepo.findById(feedbackId)
                                .orElseThrow(() -> new EntityNotFoundException("Feedback not found"));
        
        existingFeedback.setMessage(feedback.getMessage());
        existingFeedback.setRating(feedback.getRating());

        return feedbackRepo.save(existingFeedback);
    }



    
}


