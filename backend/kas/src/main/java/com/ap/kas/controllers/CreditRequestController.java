package com.ap.kas.controllers;

import javax.validation.Valid;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.services.mappers.CreditRequestMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//make all requests go through ../credit_request
@RequestMapping("credit_request")
public class CreditRequestController {

    private static final Logger logger = LoggerFactory.getLogger(CreditRequestController.class);

    @Autowired
    private CreditRequestMapper creditRequestMapper;
    
    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @PostMapping("/")
    public ResponseEntity<MessageResponse> createCreditRequest(@Valid @RequestBody CreditRequestCreateDto newCreditRequest) {
        logger.info("Incoming Credit Request DTO:\n {}", newCreditRequest);
        try {
            CreditRequest creditRequest = creditRequestMapper.convertFromCreateDTO(newCreditRequest);
            logger.info("New Credit Request:\n {}", creditRequest);
            creditRequestRepository.save(creditRequest);
            return ResponseEntity.ok(new MessageResponse("Successfully created credit request!"));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create credit request"));
        }
    }
}
