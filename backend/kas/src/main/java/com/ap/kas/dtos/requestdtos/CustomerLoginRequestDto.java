package com.ap.kas.dtos.requestdtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class CustomerLoginRequestDto {
    
    @Pattern(regexp = "^(BE)?(0|1)([0-9]{9}|[0-9]{3}[-.][0-9]{3}[-.][0-9]{3})$")
    private String companyNr;

    @NotBlank
    private String password;
}
