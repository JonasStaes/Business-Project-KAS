package com.ap.kas.dtos.updatedtos;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class PasswordChangeDto {
    
    @NotBlank
    private String token;

    @NotBlank
    private String password;
}
