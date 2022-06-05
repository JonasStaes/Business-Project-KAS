package com.ap.kas.dtos.createdtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Data;


/**
 * This class is used to recieve Customer creation data from the frontend.
 */
@Data
public class CustomerCreateDto {

    @NotBlank
    private String name;

    @Email
    private String email;

    @Pattern(regexp = "^(BE)?(0|1)([0-9]{9}|[0-9]{3}[-.][0-9]{3}[-.][0-9]{3})$")
    private String companyNr;
}
