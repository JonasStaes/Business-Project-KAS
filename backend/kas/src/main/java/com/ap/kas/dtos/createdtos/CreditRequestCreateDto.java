package com.ap.kas.dtos.createdtos;

import java.time.Period;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class CreditRequestCreateDto {
    
    @NotBlank
    private String name;

    @Positive
    private float requestedAmount;

    @Positive
    private float financedAmount; 

    @NotNull
    private Period duration; 

    @NotBlank
    private String accountability; 

    private List<MultipartFile> files;

    @NotNull
    private String customerId;
}