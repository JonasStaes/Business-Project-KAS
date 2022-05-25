package com.ap.kas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.models.CreditRequest;
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
            creditRequestRepository.findAll().stream()
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
    @DeleteMapping("/editCreditRequest/{id}")
    public ResponseEntity<MessageResponse> deactivateUser(@PathVariable String id) {
        logger.info("Incoming deletion request:\n {}", id);
        try{
            if(creditRequestRepository.existsById(id)){
                CreditRequest toBeUpdatedCreditRequest = creditRequestRepository.getById(id);
                creditRequestRepository.delete(toBeUpdatedCreditRequest);
                logger.info("Credit request deleted");
            }          
            return ResponseEntity.ok(new MessageResponse("Succesfully deleted request!"));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to delete credit request"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> readCreditRequest(@PathVariable("id") String id) {
        try {
            CreditRequest creditRequest = creditRequestRepository.findById(id).orElseThrow();
            CreditRequestReadDto readDto = creditRequestMapper.convertToReadDto(creditRequest);
            readDto.setFiles(fileStorageRepository.findAllByCreditRequest(creditRequest));

            logger.info("Outgoing Credit Request: \n {}", readDto);
            return ResponseEntity.ok(new MessageResponse("Got credit request with id: " + id, readDto)); 
        } catch (NoSuchElementException e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find credit request"));
        }
    }

    @PutMapping("/editCreditRequest/{id}")
    public ResponseEntity<MessageResponse> updateCreditRequest(@PathVariable String id, @Valid @ModelAttribute CreditRequestCreateDto creditRequest) {
        logger.info("Incoming deactivation request:\n {}", id);
        try{
            CreditRequest newCreditRequest = creditRequestMapper.convertFromCreateDTO(creditRequest);
            CreditRequest toBeUpdatedCreditRequest = creditRequestRepository.findById(id).get();
            if(newCreditRequest.getName() != null){
                toBeUpdatedCreditRequest.setName(newCreditRequest.getName());
            }
            if(newCreditRequest.getDuration() != null){
                toBeUpdatedCreditRequest.setDuration(newCreditRequest.getDuration());
            }
            if(newCreditRequest.getFinancedAmount() != 0){
                toBeUpdatedCreditRequest.setFinancedAmount(newCreditRequest.getFinancedAmount());
            }
            if(newCreditRequest.getTotalAmount() != 0){
                toBeUpdatedCreditRequest.setTotalAmount(newCreditRequest.getTotalAmount());
            }

            creditRequestRepository.save(toBeUpdatedCreditRequest);
            
            
            return ResponseEntity.ok(new MessageResponse("Succesfully updated credit request!", creditRequestMapper.convertToReadDto(toBeUpdatedCreditRequest)));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to update credit request"));
        }
    }

    
}
