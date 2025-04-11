package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Feedback;

public interface FeedbackService {
    Feedback createFeedback(Feedback feedback);
    Feedback getFeedbackById(Long feedbackId);
    List<Feedback> getAllFeedback();
    Feedback deleteFeedback(Long feedbackId);
    List<Feedback> getFeedbackByUserId(Long userId);   
} 