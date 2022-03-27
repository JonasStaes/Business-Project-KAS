package com.ap.kas.dtos.createdtos;

import javax.validation.constraints.NotBlank;

import java.util.Set;

import javax.validation.constraints.Email;

import lombok.Data;

@Data
public class EmployeeCreateDto {

    @NotBlank
    private String name;

    @Email
    private String email;

    private Set<@NotBlank String> roles;
}
