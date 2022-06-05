package com.ap.kas.dtos.readdtos;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;

import com.ap.kas.models.FeedbackDocument;
import com.ap.kas.models.FileStorage;

import lombok.Data;

/**
 * This class is used to send CreditRequest data to the frontend.
 */

@Data
public class CreditRequestReadDto {
    
    private String id;

    private String companyNr;

    private String name;

    private float totalAmount; 

    private float financedAmount;

    private Period duration; 

    private String investmentType;

    private List<FileStorage> files = new LinkedList<FileStorage>();

    private String status;

    private boolean isSuspicious;

    private FeedbackDocument feedbackDocument;

    private CompanyInfoReadDto companyInfo;
}
