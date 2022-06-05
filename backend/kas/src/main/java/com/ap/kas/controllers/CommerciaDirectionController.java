package com.ap.kas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
/**
 * The CommercialDirection Controller class contains all methods needed to perform commercial direction-related CRUD operations on the database
 */
@RestController
@RequestMapping("commercial_direction")
public class CommerciaDirectionController {

    @Autowired
    private WhiteListRepository whiteListRepository;

    @Autowired
    private BlackListRepository blackListRepository;


    private static final Logger logger = LoggerFactory.getLogger(CommerciaDirectionController.class);

    
    /** 
     * Returns a list of all existing whitelist entries
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) with a list of all existing blacklist or a 400(BAD REQUEST)
     */
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

    
    /** 
     * Returns a list of all existing blacklist entries
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) with a list of all existing blacklist entries or a 400(BAD REQUEST)
     */
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

    
    /** 
     * Adds a given sector to the whitelist
     * @param entry - A Dto object containing the NACEBEL code to be added to the whitelist
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) with the added entry object or a 400(BAD REQUEST) when the given NACEBEL code already exists in the database
     */
    @PostMapping("/whitelist")
    public ResponseEntity<MessageResponse> createWhiteListEntry(@Valid @ModelAttribute WhiteListEntry entry){
        logger.info("Incoming WhiteList entry:\n {}", entry);

        try{
            if(whiteListRepository.existsByNacebel(entry.getNacebel())){
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

    
    /** 
     * Adds a given sector to the blacklist
     * @param entry - A Dto object containing the NACEBEL code to be added to the blacklist
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) with the added entry object or a 400(BAD REQUEST) when the given NACEBEL code already exists in the database
     */
    @PostMapping("/blacklist")
    public ResponseEntity<MessageResponse> createBlackListEntry(@Valid @ModelAttribute BlackListEntry entry){
        logger.info("Incoming BlackList entry:\n {}", entry);

        try{
            if(blackListRepository.existsByNacebel(entry.getNacebel())){
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

    
    /** 
     * Deletes a whitelist entry
     * @param id - Id of the whitelist entry to be deleted
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) with the id of the deleted entry or a 400(BAD REQUEST)
     */
    @DeleteMapping("/whitelistdelete/{id}")
    public ResponseEntity<MessageResponse> deleteWhiteListEntry(@PathVariable("id") String id){
        try{
            logger.info("Incoming Whitelist delete request:\n {}", id);
            whiteListRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Whitelist entry deleted: " + id + "\n"));

        }catch (Exception e){
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to delete entry"));
        }
    }

    
    /** 
     * Deletes a blacklist entry
     * @param id - Id of the blacklist entry to be deleted
     * @return ResponseEntity<MessageResponse> - Contains a 200(OK) with the id of the deleted entry or a 400(BAD REQUEST)
     */
    @DeleteMapping("/blacklistdelete/{id}")
    public ResponseEntity<MessageResponse> deleteBlackListEntry(@PathVariable("id") String id){
        try{
            logger.info("Incoming Blacklist delete request:\n {}", id);
            blackListRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Blacklist entry deleted: " + id + "\n"));

        }catch (Exception e){
            logger.error("{}", e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to delete entry"));
        }
    }
    
}
