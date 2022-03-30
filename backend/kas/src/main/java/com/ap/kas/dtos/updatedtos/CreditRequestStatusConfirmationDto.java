package com.ap.kas.dtos.updatedtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class CreditRequestStatusConfirmationDto {
    
    @NotBlank
    private String id;

    @NotNull
    private boolean approval;

    @NotBlank
    private String approvalNote;
}
