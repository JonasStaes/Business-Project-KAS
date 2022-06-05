package com.ap.kas.services.mappers;

import com.ap.kas.dtos.readdtos.InvestmentTypeReadDto;
import com.ap.kas.models.InvestmentType;

import org.springframework.stereotype.Service;


/**
 * This class is used to map InvestmentType objects to the InvestmentTypeReadDto
 */
@Service
public class InvestmentTypeMapper {

    
    /** 
     * Converts a given InvestmentType object to an InvestmentTypeReadDto object
     * @param investmentType - The given InvestmentType object
     * @return InvestmentTypeReadDto - The converted InvestmentTypeReadDto object
     */
    public InvestmentTypeReadDto convertToReadDto(InvestmentType investmentType) {
        InvestmentTypeReadDto output = new InvestmentTypeReadDto();
        output.setName(investmentType.name());
        output.setMin(investmentType.getMin());
        output.setMax(investmentType.getMax());
        return output;
    }
}
