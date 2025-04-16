package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.EmailRequest;

@Service
public class EmailServiceImpl implements EmailRequestService {

    @Override
    public void sendEmail(EmailRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'sendEmail'");
    }

    // @Autowired
    // private JavaMailSender mailSender;

    // @Override
    // public void sendEmail(EmailRequest request) {
    //     SimpleMailMessage message = new SimpleMailMessage();
    //     message.setTo("dummy@gmail.com");
    //     message.setSubject("Contact Form Message From "+request.getName());
    //     message.setText("From: "+request.getName() + " (" + request.getEmail() + ")\n\n"+ request.getMessage());
    //     mailSender.send(message);
    // }
    
}