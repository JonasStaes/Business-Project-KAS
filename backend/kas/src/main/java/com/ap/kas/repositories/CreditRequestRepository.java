package com.ap.kas.repositories;

import java.util.Optional;

import com.ap.kas.models.CreditRequest;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface CreditRequestRepository extends CrudRepository<CreditRequest, Integer> {
    //findBy{propertyname} auto generates a method that find an entry in the repository by this prop
    Optional<CreditRequest> findByName(String name);
}
