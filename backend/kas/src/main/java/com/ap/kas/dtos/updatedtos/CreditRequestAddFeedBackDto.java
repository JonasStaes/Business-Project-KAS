package com.ap.kas.dtos.updatedtos;

import javax.validation.constraints.NotBlank;


import lombok.Data;

@Data
public class CreditRequestAddFeedBackDto {
    
    @NotBlank
    private String id;

    @NotBlank
    private String feedbackNote;
}
