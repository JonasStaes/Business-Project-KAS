package com.ap.kas.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EmployeeLoginRequestDto {
    
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
