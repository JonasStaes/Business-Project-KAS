package com.ap.kas.repositories;

import com.ap.kas.models.BlackListEntry;

import org.springframework.data.jpa.repository.JpaRepository;


/**
 * This interface is used to perform CRUD operations for the BlackListEntry class on the database.
 */
public interface BlackListRepository extends JpaRepository<BlackListEntry, String> {

    boolean existsByNacebel(String nacebel);
    BlackListEntry findByNacebel(String nacebel);
    
}
