package com.examly.springapp.model;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PasswordUpdateRequest implements Serializable{
    private String email;
    private String newPassword;
    
}
