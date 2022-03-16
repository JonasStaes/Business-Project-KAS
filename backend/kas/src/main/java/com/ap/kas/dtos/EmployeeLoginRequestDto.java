package com.ap.kas.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class EmployeeLoginRequestDto {
    
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
