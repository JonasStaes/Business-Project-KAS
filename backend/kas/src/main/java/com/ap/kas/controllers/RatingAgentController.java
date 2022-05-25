package com.ap.kas.controllers;

import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.dtos.updatedtos.CreditRequestStatusConfirmationDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.FileStorageRepository;
import com.ap.kas.services.KruispuntDBApiService;
import com.ap.kas.services.mappers.CreditRequestMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

@RestController
@RequestMapping("rating_agent")
public class RatingAgentController {
    Logger logger = LoggerFactory.getLogger(RatingAgentController.class);

    @Autowired
    private CreditRequestMapper creditRequestMapper;

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Autowired
    private FileStorageRepository fileStorageRepository;

    @Autowired
    private KruispuntDBApiService apiService;

    @GetMapping("/all")

    public ResponseEntity<MessageResponse> readCreditRequests() {

        try {

            List<CreditRequestReadDto> creditRequests = new LinkedList<CreditRequestReadDto>();
            creditRequestRepository.findAll().stream()
                .filter(cr -> {
                    return !cr.isSuspicious();
                })
                .forEach(cr -> {
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

    @PutMapping("/confirm_status")
    public ResponseEntity<MessageResponse> confirmStatus(@Valid @ModelAttribute CreditRequestStatusConfirmationDto confirmationDto) {
        logger.info("Incoming confirmation: \n {}", confirmationDto);
        try {
            CreditRequest creditRequest = creditRequestRepository.findById(confirmationDto.getId()).orElseThrow();
            creditRequestRepository.save(creditRequestMapper.confirmStatus(confirmationDto, creditRequest));

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
