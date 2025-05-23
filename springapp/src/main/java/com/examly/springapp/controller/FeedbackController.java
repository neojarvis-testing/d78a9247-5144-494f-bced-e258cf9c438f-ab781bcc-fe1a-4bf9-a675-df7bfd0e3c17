package com.examly.springapp.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    // Constructor injection
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback){
        try{
            Feedback savedFeedback = feedbackService.createFeedback(feedback);
            return ResponseEntity.status(201).body(savedFeedback);
        }
        catch(Exception e){
            return ResponseEntity.status(409).body(e.getMessage());

        }        
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllFeedback(){
        try{
            List<Feedback> allFeedbacks = feedbackService.getAllFeedback();
            return ResponseEntity.status(200).body(allFeedbacks);
        }
        catch(Exception e){
            return ResponseEntity.status(409).body(e.getMessage());

        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<?> getFeedbackByUserId(@PathVariable Long userId){
        try{
            List<Feedback> feedbackByUserId = feedbackService.getFeedbackByUserId(userId);
            return ResponseEntity.status(200).body(feedbackByUserId);
        }
        catch(Exception e){
            return ResponseEntity.status(404).body(e.getMessage());

        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id){
        try{
            Feedback deletedFeedback = feedbackService.deleteFeedback(id);
            return ResponseEntity.status(200).body(deletedFeedback);
        }
        catch(Exception e){
            return ResponseEntity.status(404).body(e.getMessage());

        }
    }

    @PutMapping("/{feedbackId}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<?> updateFeedback(@PathVariable Long feedbackId, @RequestBody Feedback feedback){
        try{
            Feedback updatedFeedback = feedbackService.updateFeedback(feedbackId, feedback);
            return ResponseEntity.status(200).body(updatedFeedback);
        }
        catch(Exception e){
            System.out.println(e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }


    


}
