package com.ap.kas.repositories;

import java.util.Optional;

import com.ap.kas.models.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This interface is used to perform CRUD operations for the Customer class on the database.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    Optional<Customer> findByName(String name);
    Optional<Customer> findByCompanyNr(String companyNr);
    boolean existsByCompanyNr(String companyNr);
}

    
