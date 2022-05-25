package com.ap.kas.services;

import com.ap.kas.dtos.readdtos.CompanyInfoReadDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class KruispuntDBApiService {

    @Autowired
    private WebClient kruispuntdb;
    
    public CompanyInfoReadDto getCompanyInfoDto(String companyNr) {
        companyNr = companyNr.replaceAll("\\D", "");
        String convertedNr = "BE" + companyNr.substring(0, 4) + "." + companyNr.substring(4, 7) + "." + companyNr.substring(7, 10);
        CompanyInfoReadDto output;
        try {
            output = kruispuntdb.get().uri("/" + convertedNr).retrieve().bodyToMono(CompanyInfoReadDto.class).block();
        } catch (Exception e) {
            System.err.println(e);
            output = CompanyInfoReadDto.builder()
                .name("Acme")
                .nacbelCode("9511001")
                .equity(1000000)
                .assets(200000)
                .result(350000)
                .tax(100000)
                .resultAfterTax(250000)
                .financialCosts(10000)
                .currentAssets(20000)
                .fixedAssets(10000)
                .shortTermDebt(5000)
                .longTermDebt(150000)
                .depreciation(100)
                .writeDown(100)
                .build();
        }
        return output;
    }
}
