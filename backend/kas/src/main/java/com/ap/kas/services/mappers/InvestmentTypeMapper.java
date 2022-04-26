package com.ap.kas.services.mappers;

import com.ap.kas.dtos.readdtos.InvestmentTypeReadDto;
import com.ap.kas.models.InvestmentType;

import org.springframework.stereotype.Service;

@Service
public class InvestmentTypeMapper {

    public InvestmentTypeReadDto convertToReadDto(InvestmentType investmentType) {
        InvestmentTypeReadDto output = new InvestmentTypeReadDto();
        output.setName(investmentType.name());
        output.setMin(investmentType.getMin());
        output.setMax(investmentType.getMax());
        return output;
    }
}
