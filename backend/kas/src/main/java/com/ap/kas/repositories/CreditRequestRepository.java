package com.ap.kas.repositories;

import java.util.List;
import java.util.Optional;

import com.ap.kas.models.CreditRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

/**
 * This interface is used to perform CRUD operations for the CreditRequest class on the database.
 */
@Repository
public interface CreditRequestRepository extends JpaRepository<CreditRequest, String> {
    //findBy{propertyname} auto generates a method that find an entry in the repository by this prop
    Optional<CreditRequest> findByName(String name);
    List<CreditRequest> findAllByCustomerId(String id);
    
}
