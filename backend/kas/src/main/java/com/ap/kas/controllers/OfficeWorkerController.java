package com.ap.kas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.dtos.createdtos.OfficeWorkerCreditRequestCreateDto;
import com.ap.kas.dtos.readdtos.CompanyInfoReadDto;
import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.Customer;
import com.ap.kas.models.FileStorage;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.repositories.EmployeeRepository;
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
    private CustomerRepository customerRepository;

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
    public ResponseEntity<MessageResponse> deleteCreditRequest(@PathVariable String id) {
        logger.info("Incoming deletion request:\n {}", id);
        try{
            if(creditRequestRepository.existsById(id)){
                CreditRequest toBeDeletedCreditRequest = creditRequestRepository.getById(id);
                creditRequestRepository.delete(toBeDeletedCreditRequest);
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

    @PostMapping("/")
    public ResponseEntity<MessageResponse> createCreditRequest(@Valid @ModelAttribute OfficeWorkerCreditRequestCreateDto newCreditRequest) {
        logger.info("Incoming Credit Request DTO:\n {}", newCreditRequest);
        logger.info("Files:\n {}", newCreditRequest.getFiles());
        try {
            CreditRequest creditRequest = creditRequestMapper.convertFromOfficeWorkerCreateDTO(newCreditRequest);
            logger.info("New Credit Request:\n {}", creditRequest);
            
            Customer linkedCustomer = customerRepository.findByCompanyNr(newCreditRequest.getCompanyNr()).get();
            creditRequest.setCustomer(linkedCustomer);
        

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
            return ResponseEntity.ok(new MessageResponse("Kredietaanvraag aangemaakt!", creditRequestMapper.convertToReadDto(creditRequest)));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Probleem bij het aanmaken van kredietaanvraag"));
        }
    }

    @PutMapping("/editCreditRequest/{id}")
    public ResponseEntity<MessageResponse> updateCreditRequest(@PathVariable String id, @Valid @ModelAttribute CreditRequestCreateDto creditRequest) {
        logger.info("Incoming update request:\n {}", id);
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

    @PutMapping("/{id}")
    public ResponseEntity<MessageResponse> validateCreditRequest(@PathVariable("id") String id) {
        try {
            CreditRequest creditRequest = creditRequestRepository.findById(id).orElseThrow();
            CompanyInfoReadDto companyInfo = apiService.getCompanyInfoDto(creditRequest.getCustomer().getCompanyNr());
            CreditRequest checkedRequest = accountingService.evaluateCreditRequest(creditRequest, companyInfo);
            creditRequestRepository.save(checkedRequest);
            return ResponseEntity.ok(new MessageResponse("Kredietaanvraag gecheked!", creditRequestMapper.convertToReadDto(checkedRequest)));
        } catch (NoSuchElementException e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Kon deze aanvraag niet vinden"));
        }
    }

    
}
