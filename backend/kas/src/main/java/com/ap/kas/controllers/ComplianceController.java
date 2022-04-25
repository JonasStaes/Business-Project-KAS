package com.ap.kas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.FileStorageRepository;
import com.ap.kas.services.mappers.CreditRequestMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("compliance")
public class ComplianceController {

    private static final Logger logger = LoggerFactory.getLogger(CreditRequestController.class);

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Autowired
    private CreditRequestMapper creditRequestMapper;

    @Autowired
    private FileStorageRepository fileStorageRepository;

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
    
}
