package com.ap.kas.services;

import com.ap.kas.dtos.readdtos.CompanyInfoDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class KruispubtDBApiService {

    @Autowired
    private WebClient kruispuntdb;
    
    public CompanyInfoDto getCompanyInfoDto(String companyNr) {
        companyNr = companyNr.replaceAll("\\d", "");
        String convertedNr = "BE" + companyNr.substring(0, 4) + "." + companyNr.substring(5, 7) + "." + companyNr.substring(8, 10);
        return kruispuntdb.get().uri("/" + convertedNr).retrieve().bodyToMono(CompanyInfoDto.class).block();
    }
}
