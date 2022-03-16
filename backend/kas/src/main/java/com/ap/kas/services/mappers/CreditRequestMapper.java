package com.ap.kas.services.mappers;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.models.CreditRequest;

import org.modelmapper.Condition;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreditRequestMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    public CreditRequest convertFromCreateDTO(CreditRequestCreateDto creditRequestCreateDto) {
        Condition<CreditRequestCreateDto, CreditRequest> notNull = ctx -> ctx.getSource() != null;
        modelMapper.typeMap(CreditRequestCreateDto.class, CreditRequest.class).addMappings(mapper -> mapper.when(notNull).map(CreditRequestCreateDto::getCustomerId, CreditRequest::setCustomer));
        return modelMapper.map(creditRequestCreateDto, CreditRequest.class);
    }

    public CreditRequestReadDto convertToReadDto(CreditRequest creditRequest) {
        return modelMapper.map(creditRequest, CreditRequestReadDto.class);
    }
}
