package com.ap.kas.repositories;

import com.ap.kas.models.WhiteListEntry;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WhiteListRepository extends JpaRepository<WhiteListEntry, String> {

    boolean existsByNacebel(String nacebel);
    
}
