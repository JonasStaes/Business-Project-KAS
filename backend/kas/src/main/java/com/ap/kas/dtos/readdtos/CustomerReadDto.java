package com.ap.kas.dtos.readdtos;

import java.util.Set;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class CustomerReadDto {

    @NotBlank
    private String id;

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotNull
    private Boolean active;

    @Max(1999999999)
    @Digits(fraction = 0, integer = 10)
    private int companyNr;
}