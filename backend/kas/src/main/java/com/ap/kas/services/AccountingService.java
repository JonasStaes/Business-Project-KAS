package com.ap.kas.services;

import com.ap.kas.dtos.readdtos.CompanyInfoDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.Status;

import org.springframework.stereotype.Service;



@Service
public class AccountingService {

    public CreditRequest evaluateCreditRequest(CreditRequest creditRequest, CompanyInfoDto companyInfo) {
        
        return creditRequest;
    }
 
    public CreditRequest evaluateCreditRequest(CreditRequest creditRequest) {

        if(creditRequest.getTotalAmount() - creditRequest.getFinancedAmount() > 10000){ //todo: what constitutes "suspicious"?
            creditRequest.setSuspicious(true);
            creditRequest.setStatus(Status.AFGEKEURD);
            return creditRequest;
        }

        if(creditRequest.getTotalAmount() - creditRequest.getFinancedAmount() > creditRequest.getTotalAmount() / 1.5){
            creditRequest.setStatus(Status.AFGEKEURD);
        } else if(creditRequest.getTotalAmount() - creditRequest.getFinancedAmount() < 500) {
            creditRequest.setStatus(Status.GOEDGEKEURD);
        } else {
            creditRequest.setStatus(Status.IN_BEHANDELING);
        }

        creditRequest.setSuspicious(false);

        return creditRequest;
    }
}
