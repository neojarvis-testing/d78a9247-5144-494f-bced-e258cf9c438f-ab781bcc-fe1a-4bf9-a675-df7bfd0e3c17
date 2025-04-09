package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

@RestController
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/api/feedback")
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback){
        try{
            Feedback savedFeedback = feedbackService.createFeedback(feedback);
            return ResponseEntity.status(201).body(savedFeedback);
        }
        catch(Exception e){
            return ResponseEntity.status(409).body(e.getMessage());

        }        
    }

    @GetMapping("/api/feedback")
    public ResponseEntity<?> getAllFeedback(){
        try{
            List<Feedback> allFeedbacks = feedbackService.getAllFeedback();
            return ResponseEntity.status(200).body(allFeedbacks);
        }
        catch(Exception e){
            return ResponseEntity.status(409).body(e.getMessage());

        }
    }

    @GetMapping("/api/feedback/user/{userId}")
    public ResponseEntity<?> getFeedbackByUserId(@PathVariable Long userId){
        try{
            List<Feedback> feedbackByUserId = feedbackService.getFeedbackByUserId(userId);
            return ResponseEntity.status(200).body(feedbackByUserId);
        }
        catch(Exception e){
            return ResponseEntity.status(404).body(e.getMessage());

        }
    }

    @DeleteMapping("/api/feedback/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id){
        try{
            Feedback deletedFeedback = feedbackService.deleteFeedback(id);
            return ResponseEntity.status(200).body(deletedFeedback);
        }
        catch(Exception e){
            return ResponseEntity.status(404).body(e.getMessage());

        }
    }

    


}
