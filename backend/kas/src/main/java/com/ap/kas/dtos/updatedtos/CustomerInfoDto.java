package com.ap.kas.dtos.updatedtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import lombok.Data;

@Data
public class CustomerInfoDto {

    @NotBlank
    private String token;

    @NotBlank
    private String password;
    
    @NotBlank
    private String township;

    @Positive
    private short homeNumber;

    @NotBlank
    private String streetName;

    @Positive
    private short postalCode;

    @NotBlank
    private String birthPlace;

    private String birthDate;

    @Positive
    private int phoneNr;

    @Positive
    private int socialRegistryNr;
}
