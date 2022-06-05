package com.ap.kas.dtos.createdtos;

import java.time.Period;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

/**
 * This class is used to recieve Credit Request creation data that an employee with the "KREDIET_BEOORDELAAR" role has submitted from the frontend.
 */
@Data
public class OfficeWorkerCreditRequestCreateDto {
    
    @NotBlank
    private String name;

    @Positive
    private float totalAmount; 

    @Positive
    private float financedAmount;

    @NotNull
    private Period duration; 

    @NotBlank
    private String investmentType;

    private List<MultipartFile> files;
    
    String approvalNote;

    @NotNull 
    private boolean isSuspicious;

    @NotBlank String companyNr;
}