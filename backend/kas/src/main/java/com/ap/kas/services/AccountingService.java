package com.ap.kas.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import com.ap.kas.dtos.readdtos.CompanyInfoDto;
import com.ap.kas.models.AmortizationSchedule;
import com.ap.kas.models.CalculatedRatio;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.FeedbackDocument;
import com.ap.kas.models.Status;
import com.ap.kas.models.FeedbackDocument.FeedbackDocumentBuilder;
import com.ap.kas.repositories.BlackListRepository;
import com.ap.kas.repositories.WhiteListRepository;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountingService {
    private final float baseInterestRate = 2;

    @Autowired
    private WhiteListRepository whiteListRepository;

    @Autowired 
    private BlackListRepository blackListRepository;

    //#region credit request evaluation
    
    public CreditRequest evaluateCreditRequest(CreditRequest creditRequest, CompanyInfoDto companyInfo) {
        FeedbackDocumentBuilder builder = FeedbackDocument.builder();

        builder = calculateRatios(companyInfo, builder);
        FeedbackDocument feedbackDocument = builder.build();

        if(checkIfMatchesWhiteListEntry(companyInfo.getNacbelCode())){
            creditRequest.setStatus(Status.GOEDGEKEURD);
            feedbackDocument.setApprovalNote("Uw kredietaanvraag is goedgekeurd.");
            feedbackDocument.setAmortizationSchedule(calculateFixedPricing(creditRequest));
        } else if(checkIfMatchesBlackListEntry(companyInfo.getNacbelCode())){
            creditRequest.setStatus(Status.IN_BEHANDELING);
            creditRequest.setSuspicious(true);
            feedbackDocument.setApprovalNote("Uw kredietaanvraag is momenteel nog in behandeling.  De bank zal u contacteren binnen 2-3 werkdagen");
        } else {
            List<Status> validatedRatios = feedbackDocument.getCalculatedRatios().stream()
                .map(ratio -> {
                    return ratio.isRatioValid();
                })
                .collect(Collectors.toList());

            long acceptedRatios = validatedRatios.stream()
                .filter(status -> status == Status.GOEDGEKEURD)
                .count();

            if(validatedRatios.contains(Status.IN_BEHANDELING)) {
                creditRequest.setStatus(Status.IN_BEHANDELING);
                feedbackDocument.setApprovalNote("Uw kredietaanvraag is momenteel nog in behandeling. De bank zal u contacteren binnen 2-3 werkdagen");
            } else if(acceptedRatios == validatedRatios.size()) {
                creditRequest.setStatus(Status.GOEDGEKEURD);
                feedbackDocument.setAmortizationSchedule(calculateFixedPricing(creditRequest));
                feedbackDocument.setApprovalNote("Uw kredietaanvraag is goedgekeurd.");
            } else {
                creditRequest.setStatus(Status.AFGEKEURD);
                feedbackDocument.setApprovalNote("Uw kredietaanvraag is afgekeurd. Uw ratio's voldoen niet aan de minima van de bank.");
            }
        }

        creditRequest.setFeedbackDocument(feedbackDocument);
        return creditRequest;
    }

    //#region evaluation methods

    private FeedbackDocumentBuilder calculateRatios(CompanyInfoDto companyInfo, FeedbackDocumentBuilder builder) {
        builder.calculatedRatios(new LinkedList<CalculatedRatio>(){{
            add(calculateSolvencyRate(companyInfo.getEquity(), companyInfo.getAssets()));
            add(calculateProfitabilityRateOnEquity(companyInfo.getResult(), companyInfo.getEquity()));
            add(calculateProfitabilityRateOnAssets(companyInfo.getResultAfterTax(), companyInfo.getFinancialCosts(), companyInfo.getTax(), companyInfo.getAssets()));
            add(calculateCurrentRatio(companyInfo.getCurrentAssets(), companyInfo.getShortTermDebt()));
            add(calculateQuickRatio(companyInfo.getCurrentAssets(), companyInfo.getStock(), companyInfo.getShortTermDebt()));
            add(calculateCashflow(companyInfo.getDepreciation(), companyInfo.getWriteDown(), companyInfo.getResultAfterTax()));
            add(calculateRepaymentCapacity(companyInfo.getDepreciation(), companyInfo.getWriteDown(), companyInfo.getResultAfterTax(), companyInfo.getShortTermDebt(), companyInfo.getLongTermDebt()));
            add(calculateDegreeOfSelfFinancing(companyInfo.getEquity(), companyInfo.getAssets()));
        }});

        return builder;
    }

    private CalculatedRatio calculateSolvencyRate(float equity, float assets) {
        return CalculatedRatio.builder()
            .name("Solvabiliteit")
            .ratio(BigDecimal.valueOf(equity)
                .divide(BigDecimal.valueOf(assets), RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .floatValue()
            )
            .ceiling(20f)
            .floor(10f)
            .build(); 
    }

    private CalculatedRatio calculateProfitabilityRateOnEquity(float result, float equity) {
        return CalculatedRatio.builder()
            .name("Rentabiliteit eigen vermogen")
            .ratio(BigDecimal.valueOf(result)
                .divide(BigDecimal.valueOf(equity), RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .floatValue()
            )
            .build();
    }

    private CalculatedRatio calculateProfitabilityRateOnAssets(float resultAfterTax, float financialCosts, float tax, float assets) {
        return CalculatedRatio.builder()
            .name("Rentabiliteit totaal vermogen")
            .ratio(BigDecimal.valueOf(resultAfterTax)
                .add(BigDecimal.valueOf(financialCosts))
                .add(BigDecimal.valueOf(tax))
                .divide(BigDecimal.valueOf(assets), RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .floatValue()
            )
            .build();
    }

    private CalculatedRatio calculateCurrentRatio(float currentAssets, float shortTermDebt) {
        return CalculatedRatio.builder()
            .name("Current Ratio")
            .ratio(BigDecimal.valueOf(currentAssets)
                .divide(BigDecimal.valueOf(shortTermDebt), RoundingMode.HALF_UP)
                .floatValue()
            )
            .ceiling(1.4f)
            .floor(1.1f)
            .build();
    }

    private CalculatedRatio calculateQuickRatio(float currentAssets, float stock, float shortTermDebt) {
        return CalculatedRatio.builder()
            .name("Quick Ratio")
            .ratio(BigDecimal.valueOf(currentAssets)
                .subtract(BigDecimal.valueOf(stock))
                .divide(BigDecimal.valueOf(shortTermDebt), RoundingMode.HALF_UP)
                .floatValue()
            )
            .build();
    }

    private CalculatedRatio calculateCashflow(float depreciation, float writeDown, float resultAfterTax) {
        return CalculatedRatio.builder()
            .name("Cashflow")
            .ratio(BigDecimal.valueOf(resultAfterTax)
                .add(BigDecimal.valueOf(depreciation ))
                .add(BigDecimal.valueOf(writeDown))
                .floatValue()
            )
            .build();
    }

    private CalculatedRatio calculateRepaymentCapacity(float depreciation, float writeDown, float resultAfterTax, float shortTermDebt, float longTermDebt) {
        return CalculatedRatio.builder()
            .name("Terugbetalingscapaciteit")
            .ratio(BigDecimal.valueOf(longTermDebt)
                .add(BigDecimal.valueOf(shortTermDebt))
                .divide(BigDecimal.valueOf(calculateCashflow(depreciation, writeDown, resultAfterTax).getRatio()), RoundingMode.HALF_UP)
                .floatValue()
            )
            .build();
    }

    private CalculatedRatio calculateDegreeOfSelfFinancing(float equity, float assets) {
        return CalculatedRatio.builder()
            .name("Graad van zelffinanciering")
            .ratio(BigDecimal.valueOf(equity)
                .divide(BigDecimal.valueOf(assets), RoundingMode.HALF_UP)
                .floatValue()
            )
            .build();
    }

    private boolean checkIfMatchesWhiteListEntry(String nacebel){
       return  whiteListRepository.findAll().stream()
            .anyMatch(entry -> entry.getNacebel().equals(nacebel));
    }

    private boolean checkIfMatchesBlackListEntry(String nacebel){
        return blackListRepository.findAll().stream()
            .anyMatch(entry -> entry.getNacebel().equals(nacebel));    
    }

    //#endregion evaluation methods

    //#endregion credit request evaluation


    private AmortizationSchedule calculateFixedPricing(CreditRequest creditRequest) {
        float requestedAmount = BigDecimal.valueOf(creditRequest.getTotalAmount())
            .subtract(BigDecimal.valueOf(creditRequest.getFinancedAmount()))
            .setScale(2, RoundingMode.HALF_UP)
            .floatValue();
        float yearlyPay = BigDecimal.valueOf(requestedAmount)
            .divide(BigDecimal.valueOf(creditRequest.getDuration().getYears()), RoundingMode.HALF_UP)
            .setScale(2, RoundingMode.HALF_UP)
            .floatValue();
        float interestRate = BigDecimal.valueOf(baseInterestRate)
            .add(
                BigDecimal.valueOf(creditRequest.getCustomer().getCustomerScore())
                    .divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP)
            )
            .setScale(2, RoundingMode.HALF_UP)
            .floatValue();

        List<Float> remainingDebtColumn = Arrays.asList(new Float[creditRequest.getDuration().getYears() + 1]);
        for (int i = 0; i < remainingDebtColumn.size() - 1; i++) {
            remainingDebtColumn.set(i, BigDecimal.valueOf(requestedAmount).setScale(2, RoundingMode.HALF_UP).floatValue());
            requestedAmount = BigDecimal.valueOf(requestedAmount)
                .subtract(BigDecimal.valueOf(yearlyPay))
                .setScale(2, RoundingMode.HALF_UP)
                .floatValue();
        }
        remainingDebtColumn.set(remainingDebtColumn.size() - 1, 0f);

        List<Float> yearlyInterestColumn = Arrays.asList(new Float[creditRequest.getDuration().getYears() + 1]);
        yearlyInterestColumn.set(0, 0f);
        for (int i = 1; i < yearlyInterestColumn.size(); i++) {
            yearlyInterestColumn.set(i, 
                BigDecimal.valueOf(remainingDebtColumn.get(i - 1))
                    .divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(interestRate))
                    .setScale(2, RoundingMode.HALF_UP)
                    .floatValue()
            );
        }

        List<Float> yearlyDebtPaymentColumn = Arrays.asList(new Float[creditRequest.getDuration().getYears() + 1]);
        yearlyDebtPaymentColumn.set(0, 0f);
        for (int i = 1; i < yearlyDebtPaymentColumn.size(); i++) {
            yearlyDebtPaymentColumn.set(i, yearlyPay);
        }

        List<Float> yearlyTotalPaymentColumn = Arrays.asList(new Float[creditRequest.getDuration().getYears() + 1]);
        yearlyTotalPaymentColumn.set(0, 0f);
        for (int i = 1; i < yearlyTotalPaymentColumn.size(); i++) {
            yearlyTotalPaymentColumn.set(i, 
                BigDecimal.valueOf(yearlyInterestColumn.get(i))
                    .add(BigDecimal.valueOf(yearlyDebtPaymentColumn.get(i)))
                    .setScale(2, RoundingMode.HALF_UP)
                    .floatValue()
            );
        }
        

        return AmortizationSchedule.builder()
            .remainingDebt(remainingDebtColumn)
            .yearlyInterest(yearlyInterestColumn)
            .yearlyDebtPayment(yearlyDebtPaymentColumn)
            .yearlyTotalPayment(yearlyTotalPaymentColumn)
            .build();

    }

    public void calculateDynamicPricing() {

    }
}
