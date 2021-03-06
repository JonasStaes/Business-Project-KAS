package com.ap.kas.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.ap.kas.dtos.readdtos.InvestmentTypeReadDto;
import com.ap.kas.models.InvestmentType;
import com.ap.kas.models.Status;
import com.ap.kas.payload.response.MessageResponse;
import com.ap.kas.services.mappers.InvestmentTypeMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * The EnumController class contains all methods needed to perform enum-related CRUD operations on the database.
 */
@RestController
@RequestMapping("enums")
public class EnumsController {

    private static final Logger logger = LoggerFactory.getLogger(EnumsController.class);

    @Autowired
    private InvestmentTypeMapper investmentTypeMapper;
    
    
    /** 
     * Returns a list of all possible statuses
     * @return ResponseEntity<MessageResponse> - Contains either a 200(OK) with the list of possible statuses OR a 400(BAD REQUEST)
     */
    @GetMapping("/statuses")
    public ResponseEntity<MessageResponse> readAllStatuses() {
        try {
            return ResponseEntity.ok(new MessageResponse("Got all credit request statuses!", Arrays.asList(Status.values())));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Something went wrong"));
        }
    }

    
    /** 
     * Returns a list of all possible investment types
     * @return ResponseEntity<MessageResponse> - Contains either a 200(OK) with the list of possible investment types OR a 400(BAD REQUEST)
     */
    @GetMapping("/investmentTypes")
    public ResponseEntity<MessageResponse> readAllInvestmentTypes() {
        try {
            List<InvestmentTypeReadDto> investmentTypes = Stream.of(InvestmentType.values())
                .map(investmentType -> investmentTypeMapper.convertToReadDto(investmentType))
                .collect(Collectors.toList());
            logger.info("{}", investmentTypes);
            return ResponseEntity.ok(new MessageResponse("Got all investment types!", investmentTypes));
        } catch (Exception e) {
            logger.error("", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Something went wrong"));
        }
    }
}
