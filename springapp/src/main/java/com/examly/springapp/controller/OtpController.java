package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class OtpController {

    @Autowired
    private JavaMailSender mailSender;

    private Map<String, String> otpStore = new HashMap<>();

    @PostMapping("/send-otp")
    public Map<String, Boolean> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpStore.put(email, otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is " + otp);
        mailSender.send(message);

        Map<String, Boolean> response = new HashMap<>();
        response.put("success", true);
        return response;
    }

    @PostMapping("/verify-otp")
    public Map<String, Boolean> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        boolean isValid = otpStore.containsKey(email) && otpStore.get(email).equals(otp);
        if (isValid) {
            otpStore.remove(email);
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", isValid);
        return response;
    }

}
