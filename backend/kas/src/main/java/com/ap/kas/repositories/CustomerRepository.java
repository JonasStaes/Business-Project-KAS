package com.ap.kas.repositories;

import java.util.Optional;

import com.ap.kas.models.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    Optional<Customer> findById(String id);
    Optional<Customer> findByName(String name);
    Optional<Customer> findByCompanyNr(int companyNr);
}

    
