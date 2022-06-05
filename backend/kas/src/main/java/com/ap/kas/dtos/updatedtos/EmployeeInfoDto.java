package com.ap.kas.dtos.updatedtos;

import javax.validation.constraints.NotBlank;

import lombok.Data;

/**
 * This class is used to recieve and update EmployeeInfo data from the frontend.
 */
@Data
public class EmployeeInfoDto {

    @NotBlank
    private String token;

    @NotBlank
    private String password;
}
