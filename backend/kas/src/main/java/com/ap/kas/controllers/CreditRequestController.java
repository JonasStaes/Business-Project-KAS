package com.ap.kas.controllers;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import javax.validation.Valid;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.FileStorage;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.services.FileStorageService;
import com.ap.kas.services.mappers.CreditRequestMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    private FileStorageService fileStorageService;
    
    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @GetMapping("/all")
    public ResponseEntity<MessageResponse> readCreditRequests() {
        try {
            List<CreditRequestReadDto> creditRequests = new LinkedList<CreditRequestReadDto>();
            creditRequestRepository.findAll().forEach(cr -> {
                creditRequests.add(creditRequestMapper.convertToReadDto(cr));
            });
            return ResponseEntity.ok(new MessageResponse("Got all credit requests!", creditRequests));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to map a credit request"));
        }
    }

    @PostMapping("/")
    public ResponseEntity<MessageResponse> createCreditRequest(@Valid @RequestBody CreditRequestCreateDto newCreditRequest) {
        logger.info("Incoming Credit Request DTO:\n {}", newCreditRequest);
        try {
            CreditRequest creditRequest = creditRequestMapper.convertFromCreateDTO(newCreditRequest);
            List<FileStorage> fileStorage = new LinkedList<FileStorage>();
            newCreditRequest.getFiles().forEach(file -> {
                try {
                    fileStorage.add(fileStorageService.convert(file, creditRequest));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            creditRequest.setFiles(fileStorage);
            logger.info("New Credit Request:\n {}", creditRequest);
            creditRequestRepository.save(creditRequest);
            return ResponseEntity.ok(new MessageResponse("Successfully created credit request!"));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create credit request"));
        }
    }
}
