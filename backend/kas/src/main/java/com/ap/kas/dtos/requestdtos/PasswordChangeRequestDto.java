package com.ap.kas.dtos.requestdtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class PasswordChangeRequestDto {
    
    @Email
    @NotBlank
    private String email;

    @Min(3)
    @NotBlank
    private String name;
}
