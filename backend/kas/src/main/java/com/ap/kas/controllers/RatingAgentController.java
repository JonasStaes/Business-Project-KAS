package com.ap.kas.controllers;

import com.ap.kas.dtos.readdtos.CreditRequestReadDto;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.FileStorageRepository;
import com.ap.kas.services.mappers.CreditRequestMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

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
