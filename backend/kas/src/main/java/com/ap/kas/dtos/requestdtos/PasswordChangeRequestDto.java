package com.ap.kas.dtos.requestdtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

/**
 * This class is used to recieve User password change request data from the frontend.
 */
@Data
public class PasswordChangeRequestDto {
    
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String name;
}
