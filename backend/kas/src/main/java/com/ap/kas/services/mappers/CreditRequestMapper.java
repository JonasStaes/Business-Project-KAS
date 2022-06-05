package com.ap.kas.services.mappers;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.dtos.createdtos.OfficeWorkerCreditRequestCreateDto;
import com.ap.kas.dtos.readdtos.CompanyInfoReadDto;
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

    
    /** 
     * Converts a given CreditRequestCreateDto object to a CreditRequest object
     * @param creditRequestCreateDto - The CreditRequestCreateDto object to be converted
     * @return CreditRequest - The converted CreditRequest object
     */
    public CreditRequest convertFromCreateDTO(CreditRequestCreateDto creditRequestCreateDto) {
        Condition<CreditRequestCreateDto, CreditRequest> notNull = ctx -> ctx.getSource() != null;
        modelMapper.typeMap(CreditRequestCreateDto.class, CreditRequest.class).addMappings(mapper -> {
            mapper.when(notNull).map(CreditRequestCreateDto::getParentId, CreditRequest::setCustomer);
            mapper.skip(CreditRequest::setId);
        });
        return modelMapper.map(creditRequestCreateDto, CreditRequest.class);
    }

    
    /** 
     * Converts a given CreditRequest object to a CreditRequestReadDto object
     * @param creditRequest - The given CreditRequest object to be converted
     * @return CreditRequestReadDto - The converted CreditRequestReadDto object
     */
    public CreditRequestReadDto convertToReadDto(CreditRequest creditRequest) {
        Condition<CreditRequest, CreditRequestReadDto> notNull = ctx -> ctx.getSource() != null;
        modelMapper.typeMap(CreditRequest.class, CreditRequestReadDto.class).addMappings(mapper -> {
            mapper.when(notNull).map(CreditRequest::getStatus, CreditRequestReadDto::setStatus);
            mapper.when(notNull).map(CreditRequest::getId, CreditRequestReadDto::setId);
        });

        return modelMapper.map(creditRequest, CreditRequestReadDto.class);
    }

    
    /** 
     * Converts and merges the given CreditRequest object and the CompanyInfoReadDto object into a CreditRequestReadDto object
     * @param creditRequest - The given CreditRequest object
     * @param companyInfo - The given CompanyInfoReadDto object
     * @return CreditRequestReadDto - The converted CreditRequestReadDto object
     */
    public CreditRequestReadDto convertToReadDtoWithCompanyInfo(CreditRequest creditRequest, CompanyInfoReadDto companyInfo) {
        Condition<CreditRequest, CreditRequestReadDto> notNull = ctx -> ctx.getSource() != null;
        modelMapper.typeMap(CreditRequest.class, CreditRequestReadDto.class).addMappings(mapper -> {
            mapper.when(notNull).map(CreditRequest::getStatus, CreditRequestReadDto::setStatus);
            mapper.when(notNull).map(CreditRequest::getId, CreditRequestReadDto::setId);
            mapper.when(notNull).map(src -> src.getCustomer().getCompanyNr(), CreditRequestReadDto::setCompanyNr);
        });
        CreditRequestReadDto output = modelMapper.map(creditRequest, CreditRequestReadDto.class);
        output.setCompanyInfo(companyInfo);
        return output;
    }

    
    /** 
     * Changes the status field of a given CreditRequest object according to the isApproval field of a given confirmationDto object. If the isApproval is true the status field will be set to "GOEDGEKEURD", if not it will be set to "AFGEKEURD"
     * @param confirmationDto - The confirmationDto object containing the isApproval boolean 
     * @param creditRequest - The given CreditRequest object
     * @return CreditRequest - The updated CreditRequest object
     */
    public CreditRequest confirmStatus(CreditRequestStatusConfirmationDto confirmationDto, CreditRequest creditRequest) {
        creditRequest.getFeedbackDocument().setApprovalNote(confirmationDto.getApprovalNote());
        if(confirmationDto.isApproval()) {
            creditRequest.setStatus(Status.GOEDGEKEURD);
        } else {
            creditRequest.setStatus(Status.AFGEKEURD);
        }
        return creditRequest;
    }

    
    /** 
     * Converts a given OfficeWorkerCreateDto object to a CreditRequest object
     * @param creditRequestCreateDto - The given OfficeWorkerCreateDto object
     * @return CreditRequest - The converted CreditRequest object
     */
    public CreditRequest convertFromOfficeWorkerCreateDTO(OfficeWorkerCreditRequestCreateDto creditRequestCreateDto) {
        Condition<OfficeWorkerCreditRequestCreateDto, CreditRequest> notNull = ctx -> ctx.getSource() != null;
        modelMapper.typeMap(OfficeWorkerCreditRequestCreateDto.class, CreditRequest.class).addMappings(mapper -> {
            mapper.skip(CreditRequest::setId);
        });
        return modelMapper.map(creditRequestCreateDto, CreditRequest.class);
    }


    
}
