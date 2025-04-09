package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FeedbackServiceImpl implements FeedbackService{

    @Autowired
    private FeedbackRepo feedbackRepo;

    @Override
    public Feedback createFeedback(Feedback feedback) {        
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
        return feedbackRepo.findAll();
        
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
        return feedbacklist;
    }


    
}


