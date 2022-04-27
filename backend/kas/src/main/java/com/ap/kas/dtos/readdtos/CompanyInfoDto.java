package com.ap.kas.dtos.readdtos;

import lombok.Data;

@Data
public class CompanyInfoDto {

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

    float fixedAssets;

    float shortTermDebt;

    float longTermDebt;

    float depreciation;

    float writeDown;
}
