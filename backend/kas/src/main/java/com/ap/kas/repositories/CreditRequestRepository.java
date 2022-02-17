package com.ap.kas.repositories;

import com.ap.kas.models.CreditRequest;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface CreditRequestRepository extends CrudRepository<CreditRequest, Integer> {
    
}
