
package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Primary
@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepo.findByUsername(userName);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + userName));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    @Override
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User loginUser(User user) {
        Optional<User> userOptional = userRepo.findByUsername(user.getUsername());
        User existingUser = userOptional.orElseThrow(() -> new RuntimeException("Invalid username or password"));
        if (existingUser.getPassword().equals(user.getPassword())) {
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
}
