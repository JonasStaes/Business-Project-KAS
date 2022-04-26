package com.ap.kas.dtos.readdtos;

import lombok.Data;

@Data
public class InvestmentTypeReadDto {
    private String name;
    private byte min;
    private byte max;
}
