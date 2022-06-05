package com.ap.kas.dtos.readdtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * This class is used to send CompanyInfo data to the frontend.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyInfoReadDto {

    String name;

    String vat;

    String nacbelCode;

    float equity;

    float assets;

    float result;

    float tax;

    float resultAfterTax;

    float financialCosts;

    float currentAssets;

    float stock;

    float fixedAssets;

    float shortTermDebt;

    float longTermDebt;

    float depreciation;

    float writeDown;
}
