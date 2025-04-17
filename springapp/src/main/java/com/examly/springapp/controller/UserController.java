package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.PasswordUpdateRequest;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserServiceImpl;


@RestController
@RequestMapping("/api")
public class UserController {

   private final UserServiceImpl userService;
   private final JwtUtils jwtUtils;

   // Constructor injection
   public UserController(UserServiceImpl userService, JwtUtils jwtUtils) {
       this.userService = userService;
       this.jwtUtils = jwtUtils;
   }

    
    
@PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        try{
            User addNewUser = userService.createUser(user);
            return ResponseEntity.status(201).body(addNewUser);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
 
        }
    }


    @PostMapping("/login")
      public ResponseEntity<?> loginUser(@RequestBody User user) {
         try {
            User loggedInUser = userService.loginUser(user);
            String token = jwtUtils.generateToken(loggedInUser.getUsername(), List.of("ROLE_"+loggedInUser.getUserRole()));

            // Create and populate LoginDTO
            LoginDTO loginDTO = new LoginDTO();
            loginDTO.setToken(token);
            loginDTO.setUsername(loggedInUser.getUsername());
            loginDTO.setUserRole(loggedInUser.getUserRole());
            loginDTO.setUserId(loggedInUser.getUserId().intValue());

            return new ResponseEntity<>(loginDTO, HttpStatus.OK);
         } catch (Exception e) {
            return ResponseEntity.status(400).body(e);
         }
      }

    
    @GetMapping("/user")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
     try {
         List<User> users = userService.findAllUsers();
         return new ResponseEntity<>(users, HttpStatus.OK);
         } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
         }
      }

    
    @DeleteMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
     public ResponseEntity<User> deleteUser(@PathVariable int userId) {
    try {
     Optional<User> userOptional = userService.getById(userId);
     if (userOptional.isPresent()) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
     } else {
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
     }
     } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
     }
    }


   @PostMapping("/update-password")
      public ResponseEntity<Map<String, String>> updatePassword(@RequestBody PasswordUpdateRequest request) {
         Optional<User> userOptional = userService.findByEmail(request.getEmail());
         System.out.println("The method is called");

         if (userOptional.isEmpty()) { 
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "User not found for email: " + request.getEmail());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
         }

         userService.updateUserPassword(request.getEmail(), request.getNewPassword());

         // Return JSON response instead of plain text
         Map<String, String> successResponse = new HashMap<>();
         successResponse.put("message", "Password updated successfully");
         return ResponseEntity.ok(successResponse);
      }

}