package com.ap.kas.dtos.createdtos;


import javax.validation.constraints.Digits;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class CustomerCreateDto {

    @NotBlank
    private String name;

    @Email
    private String email;

    @Max(1999999999)
    @Digits(fraction = 0, integer = 10)
    private int companyNr;
}
