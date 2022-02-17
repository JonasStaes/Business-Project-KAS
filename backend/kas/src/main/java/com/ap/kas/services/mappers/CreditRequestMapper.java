package com.ap.kas.services.mappers;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.repositories.CreditRequestRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreditRequestMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    public CreditRequest convertFromCreateDTO(CreditRequestCreateDto creditRequestCreateDto) {
        return modelMapper.map(creditRequestCreateDto, CreditRequest.class);
    }
}
