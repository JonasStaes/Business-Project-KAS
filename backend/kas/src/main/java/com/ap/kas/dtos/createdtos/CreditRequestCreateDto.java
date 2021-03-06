package com.ap.kas.dtos.createdtos;

import java.time.Period;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
/**
 * This class is used to recieve CreditRequest creation data from the frontend.
 */
@Data
public class CreditRequestCreateDto {
    
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

    @NotNull
    private String parentId;
    
    String approvalNote;

    @NotNull 
    private boolean isSuspicious;
}