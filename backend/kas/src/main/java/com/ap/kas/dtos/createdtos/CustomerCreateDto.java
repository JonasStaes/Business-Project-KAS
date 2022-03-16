package com.ap.kas.dtos.createdtos;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class CustomerCreateDto {

    @NotBlank
    private String name;

    @Email
    private String email;
}
