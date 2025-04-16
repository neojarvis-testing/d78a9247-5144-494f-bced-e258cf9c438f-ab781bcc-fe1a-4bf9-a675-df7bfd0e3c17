
package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Primary
@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    
    @Autowired
    private final UserRepo userRepo;

    
    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
    
    
    @Override
        public User createUser(User user) {
            // Check if user already exists
            Optional<User> existingUserByUsername = userRepo.findByUsername(user.getUsername());
            if (existingUserByUsername.isPresent()) {
                throw new RuntimeException("Username is already present");
            }

            Optional<User> existingUserByEmail = userRepo.findByEmail(user.getEmail());
            if (existingUserByEmail.isPresent()) {
                throw new RuntimeException("Email is already present");
            }

            Optional<User> existingUserByMobileNumber = userRepo.findByMobileNumber(user.getMobileNumber());
            if (existingUserByMobileNumber.isPresent()) {
                throw new RuntimeException("Mobile number is already present");
            }

            // Hash the password before saving
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode(user.getPassword()));

            return userRepo.save(user);
        }
    

    
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepo.findByUsername(userName);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + userName));
        
        // Assuming userRole is a String representing the role
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+user.getUserRole()));

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }


    @Override
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    @Override
        public User loginUser(User user) {
            Optional<User> userOptional = userRepo.findByUsername(user.getUsername());
            User existingUser = userOptional.orElseThrow(() -> new RuntimeException("Invalid username or password"));

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            
            // Compare hashed password using BCrypt
            if (encoder.matches(user.getPassword(), existingUser.getPassword())) {
                return existingUser;
            }

            throw new RuntimeException("Invalid username or password");
        }


    @Override
    public Optional<User> getById(long id) {
        return userRepo.findById(id);
    }

    @Override
    public void deleteUser(long id) {
        userRepo.deleteById((long) id);
    }

    @Override
    public boolean validateUserByUsername(String username, String password) {
        Optional<User> userOptional = userRepo.findByUsername(username);
        return userOptional.isPresent() && userOptional.get().getPassword().equals(password);
    }

    @Override
    public void updateUser(User user) {
        userRepo.save(user);
    }

    @Override
    public Optional<User> getUserByName(String name) {
        return userRepo.findByUsername(name);
    }

    public void updateUserPassword(String email, String newPassword) {
        Optional<User> userOptional = userRepo.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Securely hash the new password before updating
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode(newPassword));

            userRepo.save(user);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }


    
}
