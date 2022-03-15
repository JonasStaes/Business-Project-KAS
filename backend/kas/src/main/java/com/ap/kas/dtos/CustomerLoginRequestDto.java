package com.ap.kas.dtos;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CustomerLoginRequestDto {
    
    @Min(0000000000)
    @Max(1999999999)
    private int companyNr;

    @NotBlank
    private String password;
}
