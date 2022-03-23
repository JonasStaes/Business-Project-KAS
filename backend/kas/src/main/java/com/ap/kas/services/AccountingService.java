package com.ap.kas.services;

import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.Status;

import org.springframework.stereotype.Service;

@Service
public class AccountingService {
    
    public CreditRequest evaluateCreditRequest(CreditRequest creditRequest) {
        if(creditRequest.getTotalAmount() - creditRequest.getFinancedAmount() > creditRequest.getTotalAmount() / 1.5){
            creditRequest.setStatus(Status.AFGEKEURD);
        } else if(creditRequest.getTotalAmount() - creditRequest.getFinancedAmount() < 500) {
            creditRequest.setStatus(Status.GOEDGEKEURD);
        } else {
            creditRequest.setStatus(Status.IN_BEHANDELING);
        }

        return creditRequest;
    }
}
