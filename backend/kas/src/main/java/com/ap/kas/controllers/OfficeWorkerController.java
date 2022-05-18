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
import com.ap.kas.services.AccountingService;
import com.ap.kas.services.FileStorageService;
import com.ap.kas.services.KruispuntDBApiService;
import com.ap.kas.services.mappers.CreditRequestMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("office_worker")
public class OfficeWorkerController {

    private static final Logger logger = LoggerFactory.getLogger(OfficeWorkerController.class);

    @Autowired
    private CreditRequestMapper creditRequestMapper;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private FileStorageRepository fileStorageRepository;
    
    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Autowired
    private AccountingService accountingService;

    @Autowired
    private KruispuntDBApiService apiService;

    @GetMapping("/all")
    public ResponseEntity<MessageResponse> readCreditRequests() {
        try {
            List<CreditRequestReadDto> creditRequests = new LinkedList<CreditRequestReadDto>();
            creditRequestRepository.findAll().forEach(cr -> {
                CreditRequestReadDto readDto = creditRequestMapper.convertToReadDto(cr);
                readDto.setFiles(fileStorageRepository.findAllByCreditRequest(cr));
                creditRequests.add(readDto);
            });

            logger.info("Outgoing Credit Requests: \n {}", creditRequests);
            return ResponseEntity.ok(new MessageResponse("Got all credit requests!", creditRequests));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to map a credit request"));
        }
    }


    
}
