package com.ap.kas.services;

import com.ap.kas.repositories.WhiteListRepository;

import java.util.LinkedList;
import java.util.List;

import com.ap.kas.repositories.BlackListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class ListService {

    @Autowired 
    private WhiteListRepository whiteListRepository;

    @Autowired
    private BlackListRepository blackListRepository;
 
    public boolean CheckWhiteListEntryExistance (String newEntry){

        
        List<String> whitelistEntries = new LinkedList<String>();
        whiteListRepository.findAll().forEach(entry -> {
            whitelistEntries.add(entry);
        });

        for (String entry : whitelistEntries) {
            if (entry == newEntry){
                return true;
            }          
        }

        return false;

    }

    public boolean CheckBlackListEntryExistance (String newEntry){

        
        List<String> blackListEntries = new LinkedList<String>();
        blackListRepository.findAll().forEach(entry -> {
            blackListEntries.add(entry);
        });

        for (String entry : blackListEntries) {
            if (entry == newEntry){
                return true;
            }          
        }

        return false;

    }
}
