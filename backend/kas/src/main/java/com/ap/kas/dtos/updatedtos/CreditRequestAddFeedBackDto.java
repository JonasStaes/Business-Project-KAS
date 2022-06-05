package com.ap.kas.dtos.updatedtos;

import javax.validation.constraints.NotBlank;


import lombok.Data;
/**
 * This class is used to recieve and update CreditRequest feedback data from the frontend.
 */
@Data
public class CreditRequestAddFeedBackDto {
    
    @NotBlank
    private String id;

    @NotBlank
    private String feedbackNote;
}
