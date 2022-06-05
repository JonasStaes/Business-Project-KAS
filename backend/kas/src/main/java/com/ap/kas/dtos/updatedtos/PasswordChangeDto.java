package com.ap.kas.dtos.updatedtos;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
/**
 * This class is used to recieve and update Password data from the frontend.
 */
public class PasswordChangeDto {
    
    @NotBlank
    private String token;

    @NotBlank
    private String password;
}
