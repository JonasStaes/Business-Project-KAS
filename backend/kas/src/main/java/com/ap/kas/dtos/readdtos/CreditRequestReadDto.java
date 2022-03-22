package com.ap.kas.dtos.readdtos;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;

import javax.validation.constraints.NotBlank;

import com.ap.kas.models.FileStorage;

import lombok.Data;

@Data
public class CreditRequestReadDto {
    
    @NotBlank
    private String id;

    @NotBlank
    private String name;

    private float requestedAmount;

    private float totalAmount; 

    private Period duration; 

    @NotBlank
    private String accountability;

    private List<FileStorage> files = new LinkedList<FileStorage>();

    private String status;
}
