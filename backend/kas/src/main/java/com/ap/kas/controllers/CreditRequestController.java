package com.ap.kas.controllers;

import java.io.IOException;
import java.time.Duration;
import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.dtos.readdtos.CompanyInfoDto;
import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.FileStorage;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.FileStorageRepository;
import com.ap.kas.services.AccountingService;
import com.ap.kas.services.FileStorageService;
import com.ap.kas.services.mappers.CreditRequestMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("credit_request")
public class CreditRequestController {

    private static final Logger logger = LoggerFactory.getLogger(CreditRequestController.class);

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
    private WebClient kruispuntdb;

    @GetMapping("/all/{id}")
    public ResponseEntity<MessageResponse> readCreditRequests(@PathVariable("id") String id) {
        try {
            List<CreditRequestReadDto> creditRequests = new LinkedList<CreditRequestReadDto>();
            creditRequestRepository.findAllByCustomerId(id).forEach(cr -> {
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

    @PostMapping("/")
    public ResponseEntity<MessageResponse> createCreditRequest(@Valid @ModelAttribute CreditRequestCreateDto newCreditRequest) {
        //System.out.println(kruispuntdb.get().uri("BE0123.456.789").retrieve().bodyToMono(CompanyInfoDto.class).block().getAssets());
        logger.info("Incoming Credit Request DTO:\n {}", newCreditRequest);
        logger.info("Files:\n {}", newCreditRequest.getFiles());
        try {
            CreditRequest creditRequest = creditRequestMapper.convertFromCreateDTO(newCreditRequest);
            logger.info("New Credit Request:\n {}", creditRequest);

            //we get the request that was saved because this one contains an ID, which is what links a file to a credit request
            CreditRequest savedCreditRequest = creditRequestRepository.save(creditRequest);
            if(newCreditRequest.getFiles() != null) {
                newCreditRequest.getFiles().forEach(file -> {
                    try {
                        FileStorage convertedFile = fileStorageService.convert(file);
                        convertedFile.setCreditRequest(savedCreditRequest);
                        logger.info("Converted File: \n {}", convertedFile);
                        fileStorageRepository.save(convertedFile);
                    } catch (IOException e) {
                        logger.error("{}", e);
                    }
                });
            }
            System.out.println(creditRequestMapper.convertToReadDto(creditRequest).getId());
            return ResponseEntity.ok(new MessageResponse("Kredietaanvraag aangemaakt!", creditRequestMapper.convertToReadDto(creditRequest)));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Probleem bij het aanmaken van kredietaanvraag"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MessageResponse> validateCreditRequest(@PathVariable("id") String id) {
        System.out.println(id);
        try {
            //System.out.println(kruispuntdb.get().uri("BE0123.456.789").retrieve().bodyToMono(CompanyInfoDto.class));
            CreditRequest checkedRequest = accountingService.evaluateCreditRequest(creditRequestRepository.findById(id).orElseThrow());
            creditRequestRepository.save(checkedRequest);
            return ResponseEntity.ok(new MessageResponse("Kredietaanvraag gecheked!", creditRequestMapper.convertToReadDto(checkedRequest)));
        } catch (NoSuchElementException e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Kon deze aanvraag niet vinden"));
        }
    }
}
