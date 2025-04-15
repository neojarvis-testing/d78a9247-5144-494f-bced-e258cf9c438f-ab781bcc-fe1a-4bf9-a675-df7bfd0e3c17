package com.examly.springapp.service;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import com.examly.springapp.model.User;

public interface UserService {
    User createUser(User user);
    UserDetails loadUserByUsername(String userName);
    List<User> findAllUsers();
    User loginUser(User user);
    Optional<User> getById(long id);
    void deleteUser(long id);
    boolean validateUserByUsername(String username, String password);
    void updateUser(User user);
    Optional<User> getUserByName(String name);
    Optional<User> findByEmail(String email);

}
