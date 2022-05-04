package com.ap.kas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

import javax.validation.Valid;

import com.ap.kas.repositories.WhiteListRepository;
import com.ap.kas.services.ListService;
import com.ap.kas.repositories.BlackListRepository;

import com.ap.kas.payload.response.MessageResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("commercial")
public class CommercialManagerController {

    @Autowired
    private WhiteListRepository whiteListRepository;

   @Autowired
    private BlackListRepository blackListRepository;

    @Autowired
    private ListService listService;

    private static final Logger logger = LoggerFactory.getLogger(CreditRequestController.class);

    @GetMapping("/allwhitelist")
    public ResponseEntity<MessageResponse> readWhiteList() {
        try {
            List<String> whitelistEntries = new LinkedList<String>();
            whiteListRepository.findAll().forEach(entry -> {
                      whitelistEntries.add(entry);
            });
          
            return ResponseEntity.ok(new MessageResponse("Got all suspicious requests!", whitelistEntries));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get whitelist"));
        }
    }

    @GetMapping("/allblacklist")
    public ResponseEntity<MessageResponse> readBlackList(){
        try {
            List<String> blackListEntries = new LinkedList<String>();
            blackListRepository.findAll().forEach(entry -> {
                      blackListEntries.add(entry);
            });
          
            return ResponseEntity.ok(new MessageResponse("Got all suspicious requests!", blackListEntries));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get blacklist"));
        }

    }

    @PostMapping("/whitelist")
    public ResponseEntity<MessageResponse> createWhiteListEntry(@Valid @RequestBody String entry){
        logger.info("Incoming WhiteList entry:\n {}", entry);

        try{
            if(listService.CheckWhiteListEntryExistance(entry)){
                throw new IllegalArgumentException("Entry already exists");
            }
            whiteListRepository.save(entry);
            return ResponseEntity.ok(new MessageResponse("Added to whitelist", entry));

        } catch (IllegalArgumentException e) {
            logger.error("Cannot add the same NACBEL number twice", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Cannot add the same NACBEL number twice"));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to add entry to whitelist"));
        } 

    }

    @PostMapping("/blacklist")
    public ResponseEntity<MessageResponse> createBlackListEntry(@Valid @RequestBody String entry){
        logger.info("Incoming BlackList entry:\n {}", entry);

        try{
            if(listService.CheckBlackListEntryExistance(entry)){
                throw new IllegalArgumentException("Entry already exists");
            }
            blackListRepository.save(entry);
            return ResponseEntity.ok(new MessageResponse("Added to blacklist", entry));

        } catch (IllegalArgumentException e) {
            logger.error("Cannot add the same NACBEL number twice", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Cannot add the same NACBEL number twice"));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to add entry to blacklist"));
        } 

    }
    
}
