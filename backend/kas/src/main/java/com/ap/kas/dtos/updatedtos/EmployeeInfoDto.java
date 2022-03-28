package com.ap.kas.dtos.updatedtos;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class EmployeeInfoDto {

    @NotBlank
    private String token;

    @NotBlank
    private String password;
}
