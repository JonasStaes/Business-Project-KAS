package com.ap.kas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

import javax.validation.Valid;

import com.ap.kas.repositories.WhiteListRepository;
import com.ap.kas.repositories.BlackListRepository;
import com.ap.kas.models.BlackListEntry;
import com.ap.kas.models.WhiteListEntry;
import com.ap.kas.payload.response.MessageResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("commercial_direction")
public class CommerciaDirectionController {

    @Autowired
    private WhiteListRepository whiteListRepository;

    @Autowired
    private BlackListRepository blackListRepository;


    private static final Logger logger = LoggerFactory.getLogger(CreditRequestController.class);

    @GetMapping("/allwhitelist")
    public ResponseEntity<MessageResponse> readWhiteList() {
        try {
            List<WhiteListEntry> whitelistEntries = new LinkedList<WhiteListEntry>();
            whiteListRepository.findAll().forEach(entry -> {
                      whitelistEntries.add(entry);
            });
          
            return ResponseEntity.ok(new MessageResponse("Got all whitelist entries!", whitelistEntries));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get whitelist"));
        }
    }

    @GetMapping("/allblacklist")
    public ResponseEntity<MessageResponse> readBlackList(){
        try {
            List<BlackListEntry> blackListEntries = new LinkedList<BlackListEntry>();
            blackListRepository.findAll().forEach(entry -> {
                      blackListEntries.add(entry);
            });
          
            return ResponseEntity.ok(new MessageResponse("Got all whitelist entries!", blackListEntries));
        } catch (Exception e) {
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get blacklist"));
        }

    }

    @PostMapping("/whitelist")
    public ResponseEntity<MessageResponse> createWhiteListEntry(@Valid @ModelAttribute WhiteListEntry entry){
        logger.info("Incoming WhiteList entry:\n {}", entry);

        try{
            if(whiteListRepository.existsByNacebel(entry)){
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
    public ResponseEntity<MessageResponse> createBlackListEntry(@Valid @ModelAttribute BlackListEntry entry){
        logger.info("Incoming BlackList entry:\n {}", entry);

        try{
            if(blackListRepository.existsByNacebel(entry)){
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
