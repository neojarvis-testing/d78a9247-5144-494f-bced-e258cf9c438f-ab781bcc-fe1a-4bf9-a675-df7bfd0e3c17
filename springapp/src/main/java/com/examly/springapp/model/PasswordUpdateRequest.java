package com.examly.springapp.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PasswordUpdateRequest {
    private String email;
    private String newPassword;
    
}
