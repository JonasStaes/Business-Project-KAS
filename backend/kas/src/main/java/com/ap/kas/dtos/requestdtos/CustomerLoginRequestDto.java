package com.ap.kas.dtos.requestdtos;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class CustomerLoginRequestDto {
    
    @Min(0000000000)
    @Max(1999999999)
    private int companyNr;

    @NotBlank
    private String password;
}
