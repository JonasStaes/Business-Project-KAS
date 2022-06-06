package com.ap.kas.repositories;

import com.ap.kas.models.BlackListEntry;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlackListRepository extends JpaRepository<BlackListEntry, String> {

    boolean existsByNacebel(String nacebel);
    BlackListEntry findByNacebel(String nacebel);
    
}
