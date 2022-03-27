package com.ap.kas.dtos.requestdtos;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;

import lombok.Data;

@Data
public class CustomerFinalizationRequest {
    
    @Max(1999999999)
    @Digits(integer = 10, fraction = 0)
    private int companyNr;
}
