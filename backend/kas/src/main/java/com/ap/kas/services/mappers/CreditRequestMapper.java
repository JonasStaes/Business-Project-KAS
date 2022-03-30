package com.ap.kas.services.mappers;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.dtos.updatedtos.CreditRequestStatusConfirmationDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.Status;

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
        modelMapper.typeMap(CreditRequestCreateDto.class, CreditRequest.class).addMappings(mapper -> mapper.when(notNull).map(CreditRequestCreateDto::getParentId, CreditRequest::setCustomer));
        return modelMapper.map(creditRequestCreateDto, CreditRequest.class);
    }

    public CreditRequestReadDto convertToReadDto(CreditRequest creditRequest) {
        Condition<CreditRequest, CreditRequestReadDto> notNull = ctx -> ctx.getSource() != null;
        modelMapper.typeMap(CreditRequest.class, CreditRequestReadDto.class).addMappings(mapper -> mapper.when(notNull).map(CreditRequest::getStatus, CreditRequestReadDto::setStatus));
        return modelMapper.map(creditRequest, CreditRequestReadDto.class);
    }

    public CreditRequest confirmStatus(CreditRequestStatusConfirmationDto confirmationDto, CreditRequest creditRequest) {
        creditRequest.setApprovalNote(confirmationDto.getApprovalNote());
        if(confirmationDto.isApproval()) {
            creditRequest.setStatus(Status.GOEDGEKEURD);
        } else {
            creditRequest.setStatus(Status.AFGEKEURD);
        }
        return creditRequest;
    }
}
