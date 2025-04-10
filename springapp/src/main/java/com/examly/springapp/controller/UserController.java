package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserServiceImpl;

@RestController
@CrossOrigin(allowedHeaders = "*",origins = "*")
public class UserController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    JwtUtils jwtUtils;

    
    @PostMapping("/api/register")
        public ResponseEntity<User> registerUser(@RequestBody User user) {
            try {
                User newUser = userService.createUser(user);
               return new ResponseEntity<>(newUser, HttpStatus.CREATED);
            } catch (RuntimeException e) {
               return new ResponseEntity<>(null, HttpStatus.CONFLICT);
           }
       
        }


    @PostMapping("/api/login")
      public ResponseEntity<LoginDTO> loginUser(@RequestBody User user) {
         try {
            User loggedInUser = userService.loginUser(user);
            String token = jwtUtils.generateToken(loggedInUser.getUsername()); // Generate the JWT token

            // Create and populate LoginDTO
            LoginDTO loginDTO = new LoginDTO();
            loginDTO.setToken(token);
            loginDTO.setUsername(loggedInUser.getUsername());
            loginDTO.setUserRole(loggedInUser.getUserRole());
            loginDTO.setUserId(loggedInUser.getUserId().intValue());

            return new ResponseEntity<>(loginDTO, HttpStatus.OK);
         } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
         }
      }

    
    @GetMapping("/api/user")
    public ResponseEntity<List<User>> getAllUsers(@RequestBody User currentUser) {
     if (!"ADMIN".equals(currentUser.getUserRole())) {
        return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
     }
     try {
         List<User> users = userService.findAllUsers();
         return new ResponseEntity<>(users, HttpStatus.OK);
         } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    
    @DeleteMapping("/api/user/{userId}")
     public ResponseEntity<User> deleteUser(@PathVariable long userId, @RequestBody User currentUser) {
        if (!"ADMIN".equals(currentUser.getUserRole())) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
         }
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
}