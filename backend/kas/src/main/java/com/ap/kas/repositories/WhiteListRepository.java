package com.ap.kas.repositories;

import com.ap.kas.models.WhiteListEntry;

import org.springframework.data.jpa.repository.JpaRepository;
/**
 * This interface is used to perform CRUD operations for the WhiteListEntry class on the database.
 */
public interface WhiteListRepository extends JpaRepository<WhiteListEntry, String> {

    boolean existsByNacebel(String nacebel);
    WhiteListEntry findByNacebel(String nacebel);
    
}
