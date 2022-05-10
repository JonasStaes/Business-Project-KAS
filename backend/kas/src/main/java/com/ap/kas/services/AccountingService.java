package com.ap.kas.services;

import java.util.LinkedList;

import com.ap.kas.dtos.readdtos.CompanyInfoDto;
import com.ap.kas.models.CalculatedRatio;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.FeedbackDocument;
import com.ap.kas.models.Status;
import com.ap.kas.models.FeedbackDocument.FeedbackDocumentBuilder;

import org.springframework.stereotype.Service;

@Service
public class AccountingService {



    public CreditRequest evaluateCreditRequest(CreditRequest creditRequest, CompanyInfoDto companyInfo) {
        FeedbackDocumentBuilder builder = FeedbackDocument.builder();

        builder = calculateRatios(companyInfo, builder);
        FeedbackDocument feedbackDocument = builder.build();
        creditRequest.setFeedbackDocument(feedbackDocument);

        //zet check witte en zwarte lijst hier, als kredietaanvraag in geen een van de twee zit, voer onderstaande code uit
        //vergeet niet, verdachte aanvraagen staan op IN_BEHANDELING
        //van hier
        long validRatios = feedbackDocument.getCalculatedRatios().stream()
            .map(ratio -> {
                return ratio.isRatioValid();
            })
            .filter(calculatedRatio -> calculatedRatio)
            .count();

        if(validRatios < feedbackDocument.getCalculatedRatios().size() / 2) {
            creditRequest.setStatus(Status.AFGEKEURD);
        } else if(validRatios == feedbackDocument.getCalculatedRatios().size()) {
            creditRequest.setStatus(Status.GOEDGEKEURD);
        } else {
            creditRequest.setStatus(Status.IN_BEHANDELING);
        }
        //tot hier dus
        return creditRequest;
    }

    public FeedbackDocumentBuilder calculateRatios(CompanyInfoDto companyInfo, FeedbackDocumentBuilder builder) {
        builder.calculatedRatios(new LinkedList<CalculatedRatio>(){{
            add(calculateSolvencyRate(companyInfo.getEquity(), companyInfo.getAssets()));
            add(calculateProfitabilityRateOnEquity(companyInfo.getResult(), companyInfo.getEquity()));
            add(calculateProfitabilityRateOnAssets(companyInfo.getResultAfterTax(), companyInfo.getFinancialCosts(), companyInfo.getTax(), companyInfo.getAssets()));
            add(calculateCurrentRatio(companyInfo.getCurrentAssets(), companyInfo.getShortTermDebt()));
            add(calculateCashflow(companyInfo.getDepreciation(), companyInfo.getWriteDown(), companyInfo.getResultAfterTax()));
            add(calculateRepaymentCapacity(companyInfo.getDepreciation(), companyInfo.getWriteDown(), companyInfo.getResultAfterTax(), companyInfo.getShortTermDebt(), companyInfo.getLongTermDebt()));
            add(calculateDegreeOfSelfFinancing(companyInfo.getEquity(), companyInfo.getAssets()));
        }});

        return builder;
    }

    private CalculatedRatio calculateSolvencyRate(float equity, float assets) {
        return CalculatedRatio.builder()
            .name("Solvabiliteit")
            .ratio((equity / assets) * 100)
            .minimum(33f)
            .build(); 
    }

    private CalculatedRatio calculateProfitabilityRateOnEquity(float result, float equity) {
        return CalculatedRatio.builder()
            .name("Rentabiliteit eigen vermogen")
            .ratio((result / equity) * 100)
            .minimum(3f)
            .build();
    }

    private CalculatedRatio calculateProfitabilityRateOnAssets(float resultAfterTax, float financialCosts, float tax, float assets) {
        return CalculatedRatio.builder()
            .name("Rentabiliteit totaal vermogen")
            .ratio(((resultAfterTax + financialCosts + tax) / assets) * 100)
            .minimum(3f)
            .build();
    }

    private CalculatedRatio calculateCurrentRatio(float currentAssets, float shortTermDebt) {
        return CalculatedRatio.builder()
            .name("Current Ratio")
            .ratio(currentAssets / shortTermDebt)
            .minimum(100)
            .build();
    }

    private CalculatedRatio calculateCashflow(float depreciation, float writeDown, float resultAfterTax) {
        return CalculatedRatio.builder()
            .name("Cashflow")
            .ratio(resultAfterTax + depreciation + writeDown)
            .minimum(0)
            .build();
    }

    private CalculatedRatio calculateRepaymentCapacity(float depreciation, float writeDown, float resultAfterTax, float shortTermDebt, float longTermDebt) {
        return CalculatedRatio.builder()
            .name("Terugbetalingscapaciteit")
            .ratio((longTermDebt + shortTermDebt) / calculateCashflow(depreciation, writeDown, resultAfterTax).getRatio())
            .minimum(0)
            .build();
    }

    private CalculatedRatio calculateDegreeOfSelfFinancing(float equity, float assets) {
        return CalculatedRatio.builder()
            .name("Graad van zelffinanciering")
            .ratio(equity / assets)
            .minimum(0)
            .build();
    }
}
