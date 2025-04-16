package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.EmailRequest;
import com.examly.springapp.service.EmailRequestService;

@RestController
public class EmailController {

    @Autowired
    private EmailRequestService emailRequestService;

    @PostMapping("/api/mail/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest request) {
        System.out.println("Recieved email Request: "+request);
        emailRequestService.sendEmail(request);
        return ResponseEntity.status(200).body("Email sent successfully");
    }
}