package com.ap.kas.dtos.requestdtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

/**
 * This class is used to recieve Employee login request data from the frontend.
 */
@Data
public class EmployeeLoginRequestDto {
    
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
