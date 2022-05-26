package com.ap.kas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.dtos.updatedtos.CreditRequestAddFeedBackDto;
import com.ap.kas.dtos.updatedtos.CreditRequestStatusConfirmationDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.FileStorageRepository;
import com.ap.kas.services.KruispuntDBApiService;
import com.ap.kas.services.mappers.CreditRequestMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("compliance")
public class ComplianceController {

    private static final Logger logger = LoggerFactory.getLogger(ComplianceController.class);

    @Autowired
    private KruispuntDBApiService apiService;

    @Autowired
    private FileStorageRepository fileStorageRepository;

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Autowired
    private CreditRequestMapper creditRequestMapper;

    @GetMapping("/all")
    public ResponseEntity<MessageResponse> readSuspiciousRequests() {
        try {
            List<CreditRequestReadDto> suspiciousRequests = new LinkedList<CreditRequestReadDto>();
            creditRequestRepository.findAll().forEach(creditRequest -> {
                if(creditRequest.isSuspicious()){
                    suspiciousRequests.add(creditRequestMapper.convertToReadDto(creditRequest)); 
                }                
            });
          
            return ResponseEntity.ok(new MessageResponse("Got all suspicious requests!", suspiciousRequests));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to map a request"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> readCreditRequest(@PathVariable("id") String id) {
        try {
            CreditRequest creditRequest = creditRequestRepository.findById(id).orElseThrow();
            CreditRequestReadDto readDto = creditRequestMapper.convertToReadDtoWithCompanyInfo(creditRequest,
                apiService.getCompanyInfoDto(creditRequest.getCustomer().getCompanyNr())
            );
            readDto.setFiles(fileStorageRepository.findAllByCreditRequest(creditRequest));

            logger.info("Outgoing Credit Request: \n {}", readDto);
            return ResponseEntity.ok(new MessageResponse("Got credit request with id: " + id, readDto)); 
        } catch (NoSuchElementException e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find credit request"));
        }
    }

    @PutMapping("/add_feedback")
    public ResponseEntity<MessageResponse> confirmStatus(@Valid @ModelAttribute CreditRequestAddFeedBackDto feedbackDto) {
        logger.info("Incoming compliance feedback: \n {}", feedbackDto);
        try {
            CreditRequest creditRequest = creditRequestRepository.findById(feedbackDto.getId()).orElseThrow();
            creditRequest.getFeedbackDocument().setFeedbackNote(feedbackDto.getFeedbackNote());

            logger.info("Confirmed Credit Request: \n {}", creditRequest);
            return ResponseEntity.ok(new MessageResponse("Confirmed credit request status as " + creditRequest.getStatus(), creditRequest));
        } catch(NoSuchElementException e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find credit request"));
        } catch(Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find credit request"));
        }
    }
    
}
