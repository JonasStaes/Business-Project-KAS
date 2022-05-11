package com.ap.kas.services;

import com.ap.kas.dtos.readdtos.CompanyInfoDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;

@Service
public class KruispuntDBApiService {

    @Autowired
    private WebClient kruispuntdb;
    
    public CompanyInfoDto getCompanyInfoDto(String companyNr) {
        companyNr = companyNr.replaceAll("\\D", "");
        String convertedNr = "BE" + companyNr.substring(0, 4) + "." + companyNr.substring(5, 7) + "." + companyNr.substring(8, 10);
        CompanyInfoDto output;
        try {
            output = kruispuntdb.get().uri("/" + convertedNr).retrieve().bodyToMono(CompanyInfoDto.class).block();
        } catch (WebClientRequestException e) {
            output = new CompanyInfoDto();
        } catch (Exception e) {
            output = kruispuntdb.get().uri("/BE0123.456.789").retrieve().bodyToMono(CompanyInfoDto.class).block();
        }
        System.out.println(output);
        return output;
    }
}
