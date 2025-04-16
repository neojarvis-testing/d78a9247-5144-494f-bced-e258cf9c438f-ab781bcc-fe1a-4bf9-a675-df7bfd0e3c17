package com.examly.springapp.service;

import com.examly.springapp.model.EmailRequest;

public interface EmailRequestService {
    
    public void sendEmail(EmailRequest request);
    
}
