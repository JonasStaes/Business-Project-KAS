package com.ap.kas.dtos.readdtos;

import lombok.Data;


/**
 * This class is used to send InvestmentType data to the frontend.
 */
@Data
public class InvestmentTypeReadDto {
    private String name;
    private byte min;
    private byte max;
}
