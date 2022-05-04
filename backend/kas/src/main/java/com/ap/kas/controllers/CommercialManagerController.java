package com.ap.kas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;
import com.ap.kas.repositories.WhiteListRepository;
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
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to get whitelist"));
        }

    }
    
}
