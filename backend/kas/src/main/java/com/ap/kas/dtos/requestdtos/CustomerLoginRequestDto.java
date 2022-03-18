package com.ap.kas.dtos.requestdtos;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class CustomerLoginRequestDto {
    
    @Max(1999999999)
    @Digits(fraction = 0, integer = 10)
    private int companyNr;

    @NotBlank
    private String password;
}
