package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{

    Optional<User> findByUsername(String userName);
    Optional<User> findByEmail(String email);   
    Optional<User> findByMobileNumber(String mobileNumber);

}
