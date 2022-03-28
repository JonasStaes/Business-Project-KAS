package com.ap.kas.dtos.requestdtos;

import javax.validation.constraints.Email;

import lombok.Data;

@Data
public class EmployeeFinalizationRequest {
    
    @Email
    private String email;
}
